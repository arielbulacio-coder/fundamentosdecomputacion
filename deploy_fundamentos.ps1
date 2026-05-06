# ─────────────────────────────────────────────────────────────────────
# Deploy Fundamentos / SimuUnpilar a donweb (149.50.130.160)
#
# Cambios respecto a la versión anterior:
# - Maneja correctamente el exit code de robocopy (1-7 son éxitos).
# - Usa `tar.gz` en vez de Compress-Archive (sin warnings de backslash,
#   más rápido y más liviano).
# - YA NO ejecuta `docker compose down -v` — eso borraba el volumen de
#   la base de datos. Ahora solo recrea contenedores preservando datos.
# - Verifica $LASTEXITCODE después de cada comando externo (ssh/scp/tar).
# - Mensaje final con la URL real de producción.
# ─────────────────────────────────────────────────────────────────────

$ErrorActionPreference = 'Stop'

$ServerIP    = '149.50.130.160'
$User        = 'root'
$KeyPath     = 'c:\ProyectosGit\consultora\keys\id_ed25519_donweb'
$RemoteBase  = '/root'
$App         = 'fundamentos'
$Source      = 'c:\ProyectosGit\fundamentosdecomputacion'
$ProdUrl     = 'https://simuunpilar.com.ar'
$ArchiveLocal  = "$env:TEMP\deploy_fundamentos.tgz"
$ArchiveRemote = "$RemoteBase/$App.tgz"
$TempDir       = "$env:TEMP\deploy_stage_fundamentos"

function Assert-LastExit {
    param([string]$What)
    if ($LASTEXITCODE -ne 0) {
        throw "Falló: $What (exit $LASTEXITCODE)"
    }
}

Write-Host "Deploy Fundamentos -> $ServerIP" -ForegroundColor Cyan
Write-Host "==================================`n" -ForegroundColor Cyan

# ── 1. Preparar directorio de staging ──────────────────────────────
if (Test-Path $ArchiveLocal) { Remove-Item $ArchiveLocal -Force }
if (Test-Path $TempDir) { Remove-Item $TempDir -Recurse -Force }
New-Item -ItemType Directory -Path $TempDir | Out-Null

Write-Host '[1/5] Copiando archivos (sin node_modules / .git / dist / zips / logs)...' -ForegroundColor Yellow
robocopy $Source $TempDir /E /XD node_modules .git dist /XF '*.zip' '*.log' 'caddy_*.txt' 'remote_*.yml.tmp' 'temp_*.txt' /NFL /NDL /NJH /NJS /NC /NS | Out-Null
# robocopy: exits 0..7 = éxito, 8+ = error real
if ($LASTEXITCODE -ge 8) { throw "robocopy falló (exit $LASTEXITCODE)" }
$global:LASTEXITCODE = 0

# ── 2. Empaquetar con tar (sin warnings de backslash) ──────────────
Write-Host '[2/5] Empaquetando .tgz...' -ForegroundColor Yellow
Push-Location $TempDir
try {
    tar -czf $ArchiveLocal .
    Assert-LastExit 'tar -czf'
} finally {
    Pop-Location
}
$sizeMB = [Math]::Round((Get-Item $ArchiveLocal).Length / 1MB, 1)
Write-Host "       paquete: $sizeMB MB" -ForegroundColor DarkGray

# ── 3. Subir al servidor ───────────────────────────────────────────
Write-Host '[3/5] Subiendo .tgz al servidor...' -ForegroundColor Yellow
ssh -o StrictHostKeyChecking=no -o IdentitiesOnly=yes -i $KeyPath "$User@$ServerIP" "mkdir -p $RemoteBase/$App"
Assert-LastExit 'ssh mkdir'

scp -o StrictHostKeyChecking=no -o IdentitiesOnly=yes -i $KeyPath $ArchiveLocal "${User}@${ServerIP}:$ArchiveRemote"
Assert-LastExit 'scp upload'

# ── 4. Reemplazar código y rebuildear container (preservando volúmenes) ─
Write-Host '[4/5] Extrayendo + rebuild + recreate (preserva DB)...' -ForegroundColor Yellow
$RemoteScript = @"
set -e
cd $RemoteBase/$App
echo '> Limpiando código viejo (preservando .git/node_modules si existieran)...'
find . -mindepth 1 -maxdepth 1 ! -name 'node_modules' ! -name '.git' -exec rm -rf {} +
echo '> Extrayendo nuevo paquete...'
tar -xzf $ArchiveRemote
echo '> Building imagen frontend...'
docker compose build fundamentos
echo '> Recreando contenedor frontend (volumes intactos)...'
docker compose up -d --force-recreate --remove-orphans fundamentos
echo '> Estado de contenedores:'
docker ps --format '  {{.Names}}  {{.Status}}' | grep fundamentos
"@
ssh -o StrictHostKeyChecking=no -o IdentitiesOnly=yes -i $KeyPath "$User@$ServerIP" $RemoteScript
Assert-LastExit 'rebuild remoto'

# ── 5. Cleanup local ───────────────────────────────────────────────
Write-Host '[5/5] Limpieza local...' -ForegroundColor Yellow
Remove-Item $ArchiveLocal -Force -ErrorAction SilentlyContinue
Remove-Item $TempDir -Recurse -Force -ErrorAction SilentlyContinue

Write-Host ''
Write-Host '====================================='   -ForegroundColor Green
Write-Host '  Deploy completo' -ForegroundColor Green
Write-Host '====================================='   -ForegroundColor Green
Write-Host "  Producción: $ProdUrl" -ForegroundColor Green
Write-Host ''
exit 0
