const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3010;
const JWT_SECRET = process.env.JWT_SECRET || 'fundamentos_secret_2026_cambiar_en_produccion';

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());

// ─── PostgreSQL Pool ───────────────────────────────────────────────────────────
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'fundamentos',
  user: process.env.DB_USER || 'fundamentos',
  password: process.env.DB_PASSWORD || 'fundamentos123',
});

// ─── Simple JWT helper ─────────────────────────────────────────────────────────
function makeToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify({ ...payload, iat: Date.now() })).toString('base64url');
  const sig = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${sig}`;
}

function verifyToken(token) {
  try {
    const [header, body, sig] = token.split('.');
    const expected = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
    if (sig !== expected) return null;
    return JSON.parse(Buffer.from(body, 'base64url').toString());
  } catch { return null; }
}

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Token requerido.' });
  const payload = verifyToken(auth.slice(7));
  if (!payload) return res.status(401).json({ error: 'Token inválido o expirado.' });
  req.docente = payload;
  next();
}

function sha256(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

// ─── Init DB ───────────────────────────────────────────────────────────────────
async function initDB() {
  const client = await pool.connect();
  try {
    // Tabla de evaluaciones
    await client.query(`
      CREATE TABLE IF NOT EXISTS evaluaciones (
        id SERIAL PRIMARY KEY,
        numero_comision VARCHAR(20) NOT NULL,
        dni VARCHAR(20) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        nombres VARCHAR(150) NOT NULL,
        materia VARCHAR(150) NOT NULL DEFAULT 'Fundamentos de Computación',
        unidad VARCHAR(50) NOT NULL,
        clase VARCHAR(150) NOT NULL,
        puntaje INTEGER NOT NULL,
        total INTEGER NOT NULL,
        porcentaje NUMERIC(5,2) NOT NULL,
        fecha TIMESTAMPTZ DEFAULT NOW()
      );
      -- Add materia column if upgrading from old schema
      ALTER TABLE evaluaciones ADD COLUMN IF NOT EXISTS materia VARCHAR(150) NOT NULL DEFAULT 'Fundamentos de Computación';
    `);

    // Tabla de docentes
    await client.query(`
      CREATE TABLE IF NOT EXISTS docentes (
        id SERIAL PRIMARY KEY,
        usuario VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(64) NOT NULL,
        nombre_completo VARCHAR(150) NOT NULL,
        comisiones TEXT[] DEFAULT '{}',
        es_admin BOOLEAN DEFAULT FALSE,
        creado_en TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Insertar docente admin por defecto si no existe
    const admin = await client.query("SELECT id FROM docentes WHERE usuario = 'admin'");
    if (admin.rows.length === 0) {
      await client.query(`
        INSERT INTO docentes (usuario, password_hash, nombre_completo, es_admin, comisiones)
        VALUES ('admin', $1, 'Administrador', TRUE, '{}')
      `, [sha256('admin2026')]);
      console.log('✅ Usuario admin creado (usuario: admin / pass: admin2026)');
    }

    console.log('✅ Base de datos inicializada');
  } catch (err) {
    console.error('❌ Error iniciando DB:', err.message);
  } finally {
    client.release();
  }
}

// ─── Routes: Auth ──────────────────────────────────────────────────────────────

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Login docente
app.post('/api/auth/login', async (req, res) => {
  const { usuario, password } = req.body;
  if (!usuario || !password) return res.status(400).json({ error: 'Usuario y contraseña requeridos.' });

  try {
    const result = await pool.query(
      'SELECT * FROM docentes WHERE usuario = $1 AND password_hash = $2',
      [usuario.trim(), sha256(password)]
    );
    if (result.rows.length === 0) return res.status(401).json({ error: 'Credenciales incorrectas.' });

    const docente = result.rows[0];
    const token = makeToken({
      id: docente.id,
      usuario: docente.usuario,
      nombre: docente.nombre_completo,
      comisiones: docente.comisiones,
      admin: docente.es_admin
    });

    res.json({
      token,
      docente: {
        usuario: docente.usuario,
        nombre: docente.nombre_completo,
        comisiones: docente.comisiones,
        admin: docente.es_admin
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error del servidor.' });
  }
});

// Verificar token
app.get('/api/auth/me', authMiddleware, (req, res) => res.json({ docente: req.docente }));

// ─── Routes: Evaluaciones ──────────────────────────────────────────────────────

// Registrar evaluación aprobada (público, lo hace el alumno)
app.post('/api/evaluaciones', async (req, res) => {
  const { numero_comision, dni, apellido, nombres, materia, unidad, clase, puntaje, total } = req.body;
  if (!numero_comision || !dni || !apellido || !nombres || !clase || !unidad)
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  if (typeof puntaje !== 'number' || typeof total !== 'number')
    return res.status(400).json({ error: 'Puntaje y total deben ser números.' });

  const porcentaje = ((puntaje / total) * 100).toFixed(2);
  const materiaFinal = (materia || 'Fundamentos de Computación').trim();
  try {
    const result = await pool.query(
      `INSERT INTO evaluaciones (numero_comision, dni, apellido, nombres, materia, unidad, clase, puntaje, total, porcentaje)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id, fecha`,
      [numero_comision.trim(), dni.trim(), apellido.trim().toUpperCase(), nombres.trim(), materiaFinal, unidad, clase, puntaje, total, porcentaje]
    );
    res.status(201).json({ mensaje: '¡Evaluación registrada exitosamente!', id: result.rows[0].id, fecha: result.rows[0].fecha, porcentaje });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Consultar evaluaciones (requiere auth, filtra por comisiones del docente)
app.get('/api/evaluaciones', authMiddleware, async (req, res) => {
  const { comision, unidad, clase } = req.query;
  const docente = req.docente;

  try {
    let conditions = [];
    const params = [];

    // Docentes no admin solo ven sus comisiones asignadas
    if (!docente.admin && docente.comisiones && docente.comisiones.length > 0) {
      params.push(docente.comisiones);
      conditions.push(`numero_comision = ANY($${params.length})`);
    } else if (!docente.admin && (!docente.comisiones || docente.comisiones.length === 0)) {
      return res.json({ evaluaciones: [], total: 0, mensaje: 'No tenés comisiones asignadas.' });
    }

    if (comision) { params.push(comision); conditions.push(`numero_comision = $${params.length}`); }
    if (unidad) { params.push(unidad); conditions.push(`unidad = $${params.length}`); }
    if (clase) { params.push(clase); conditions.push(`clase = $${params.length}`); }

    const where = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';
    const result = await pool.query(`SELECT * FROM evaluaciones ${where} ORDER BY fecha DESC`, params);
    res.json({ evaluaciones: result.rows, total: result.rows.length });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error del servidor.' });
  }
});

// ─── Routes: Admin ─────────────────────────────────────────────────────────────

// Listar docentes (admin)
app.get('/api/docentes', authMiddleware, async (req, res) => {
  if (!req.docente.admin) return res.status(403).json({ error: 'Solo el administrador puede ver docentes.' });
  try {
    const result = await pool.query('SELECT id, usuario, nombre_completo, comisiones, es_admin, creado_en FROM docentes ORDER BY creado_en');
    res.json({ docentes: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Error del servidor.' });
  }
});

// Crear docente (admin)
app.post('/api/docentes', authMiddleware, async (req, res) => {
  if (!req.docente.admin) return res.status(403).json({ error: 'Solo el administrador puede crear docentes.' });
  const { usuario, password, nombre_completo, comisiones } = req.body;
  if (!usuario || !password || !nombre_completo) return res.status(400).json({ error: 'usuario, password y nombre_completo son requeridos.' });
  try {
    await pool.query(
      'INSERT INTO docentes (usuario, password_hash, nombre_completo, comisiones) VALUES ($1, $2, $3, $4)',
      [usuario.trim(), sha256(password), nombre_completo.trim(), comisiones || []]
    );
    res.status(201).json({ mensaje: `Docente '${usuario}' creado exitosamente.` });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'El usuario ya existe.' });
    res.status(500).json({ error: 'Error del servidor.' });
  }
});

// Actualizar comisiones de un docente (admin)
app.put('/api/docentes/:id/comisiones', authMiddleware, async (req, res) => {
  if (!req.docente.admin) return res.status(403).json({ error: 'Solo el administrador puede modificar comisiones.' });
  const { comisiones } = req.body;
  if (!Array.isArray(comisiones)) return res.status(400).json({ error: 'comisiones debe ser un array.' });
  try {
    await pool.query('UPDATE docentes SET comisiones = $1 WHERE id = $2', [comisiones, req.params.id]);
    res.json({ mensaje: 'Comisiones actualizadas.' });
  } catch (err) {
    res.status(500).json({ error: 'Error del servidor.' });
  }
});

// ─── Start ────────────────────────────────────────────────────────────────────
initDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Fundamentos API en puerto ${PORT}`));
}).catch(err => { console.error('❌ DB init error:', err.message); process.exit(1); });
