# ─────────────────────────────────────────────────────────────────────
# Deploy incremental rápido: copia solo src/ + public/ + index.html
# vía rsync (si está disponible) o scp recursivo, y rebuildea el
# container del frontend en el servidor. Tarda ~15-20 segundos vs
# los ~5 minutos del deploy completo.
#
# Usar cuando solo cambiaron archivos de código (no docker-compose,
# package.json, Dockerfile o nginx.conf).
# ─────────────────────────────────────────────────────────────────────

$ErrorActionPreference = 'Stop'

$ServerIP   = '149.50.130.160'
$User       = 'root'
$KeyPath    = 'c:\ProyectosGit\consultora\keys\id_ed25519_donweb'
$RemoteBase = '/root/fundamentos'
$Source     = 'c:\ProyectosGit\fundamentosdecomputacion'
$ProdUrl    = 'https://simuunpilar.com.ar'

function Assert-LastExit {
    param([string]$What)
    if ($LASTEXITCODE -ne 0) { throw "Falló: $What (exit $LASTEXITCODE)" }
}

Write-Host 'Deploy QUICK (solo src/) -> donweb' -ForegroundColor Cyan
Write-Host "===================================`n" -ForegroundColor Cyan

# Construir tar.gz con solo lo que importa
$Archive = "$env:TEMP\deploy_fundamentos_quick.tgz"
if (Test-Path $Archive) { Remove-Item $Archive -Force }

Write-Host '[1/3] Empaquetando src/, public/, index.html...' -ForegroundColor Yellow
Push-Location $Source
try {
    tar -czf $Archive src public index.html package.json vite.config.js
    Assert-LastExit 'tar -czf'
} finally {
    Pop-Location
}
$sizeKB = [Math]::Round((Get-Item $Archive).Length / 1KB, 0)
Write-Host "       paquete: $sizeKB KB" -ForegroundColor DarkGray

# Subir y extraer en el servidor
Write-Host '[2/3] Subiendo y extrayendo en servidor...' -ForegroundColor Yellow
scp -o StrictHostKeyChecking=no -o IdentitiesOnly=yes -i $KeyPath $Archive "${User}@${ServerIP}:/tmp/quick.tgz"
Assert-LastExit 'scp'

ssh -o StrictHostKeyChecking=no -o IdentitiesOnly=yes -i $KeyPath "$User@$ServerIP" @"
set -e
cd $RemoteBase
tar -xzf /tmp/quick.tgz
rm /tmp/quick.tgz
echo 'OK'
"@
Assert-LastExit 'extracción remota'

# Rebuild + recreate
Write-Host '[3/3] Rebuild + recreate del frontend...' -ForegroundColor Yellow
ssh -o StrictHostKeyChecking=no -o IdentitiesOnly=yes -i $KeyPath "$User@$ServerIP" @"
set -e
cd $RemoteBase
docker compose build fundamentos
docker compose up -d --force-recreate fundamentos
docker ps --format '  {{.Names}}  {{.Status}}' | grep fundamentos
"@
Assert-LastExit 'rebuild remoto'

Remove-Item $Archive -Force -ErrorAction SilentlyContinue

Write-Host ''
Write-Host '====================================='   -ForegroundColor Green
Write-Host '  Quick deploy completo' -ForegroundColor Green
Write-Host '====================================='   -ForegroundColor Green
Write-Host "  Producción: $ProdUrl" -ForegroundColor Green
Write-Host ''
exit 0
