import fs from 'fs';

function wrapComponent(file, keyword, title, startRegex, endRegex) {
  let content = fs.readFileSync('src/pages/' + file, 'utf8');
  if (!content.includes('LockedContent')) {
    content = "import LockedContent from '../components/LockedContent';\n" + content;
  }
  
  content = content.replace(startRegex, `return (\n    <LockedContent keyword="${keyword}" title="${title}">\n      $1`);
  content = content.replace(endRegex, `      $1\n    </LockedContent>\n  );\n};\n`);
  
  fs.writeFileSync('src/pages/' + file, content);
}

wrapComponent('Generaciones.jsx', 'valvulas', 'Clase 1: Generaciones de Computadoras', /return \(\s*(<div className="gen-page">)/, /(<\/div>)\s*\);\s*};\s*const Simulador/);
wrapComponent('VonNeumann.jsx', 'arquitectura', 'Clase 2: Modelo de Von Neumann', /return \(\s*(<div className="vn-page">)/, /(<\/div>)\s*\);\s*};\s*export default VonNeumann/);
wrapComponent('Harvard.jsx', 'arquitectura', 'Clase 2 suplemento: Harvard', /return \(\s*(<div className="harv-page"[^>]*>)/, /(<\/div>)\s*\);\s*};\s*export default Harvard/);
wrapComponent('CPU.jsx', 'procesador', 'Clase 3: CPU Motor de ejecución', /return \(\s*(<div className="cpu-page">)/, /(<\/div>)\s*\);\s*}\s*$/); // Note: CPU has `}` not `};` but the replacement changes it to `};`, which is fine for modern bundlers/React

console.log("Wrapping done!");
