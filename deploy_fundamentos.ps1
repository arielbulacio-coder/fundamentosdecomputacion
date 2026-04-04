$ServerIP = "149.50.130.160"
$User = "root"
$KeyPath = "c:\ProyectosGit\consultora\keys\id_ed25519_donweb"
$RemoteBase = "/root"
$App = "fundamentos"
$Source = "c:\ProyectosGit\fundamentosdecomputacion"
$ZipPath = "$env:TEMP\deploy_fundamentos.zip"
$TempDir = "$env:TEMP\deploy_stage_fundamentos"

Write-Host "Iniciando despliegue de Fundamentos de Computacion..." -ForegroundColor Cyan

# 1. Prepare Local Files
if (Test-Path $ZipPath) { Remove-Item $ZipPath }
if (Test-Path $TempDir) { Remove-Item $TempDir -Recurse -Force }
New-Item -ItemType Directory -Path $TempDir | Out-Null

Write-Host "Copiando archivos..."
robocopy $Source $TempDir /E /XD node_modules .git dist | Out-Null

Write-Host "Comprimiendo..."
Compress-Archive -Path "$TempDir\*" -DestinationPath $ZipPath

# 2. Upload App
Write-Host "Subiendo App..."
ssh -o StrictHostKeyChecking=no -i $KeyPath $User@$ServerIP "mkdir -p $RemoteBase/$App"
scp -o StrictHostKeyChecking=no -i $KeyPath $ZipPath "$User@$ServerIP`:$RemoteBase/$App.zip"

# 3. Deploy on Server
Write-Host "Reconstruyendo contenedor..."
$DeployCmd = "rm -rf $RemoteBase/$App/* && cd $RemoteBase/$App && unzip -o ../$App.zip && docker compose down -v --remove-orphans && docker compose build --no-cache && docker compose up -d --force-recreate"
ssh -o StrictHostKeyChecking=no -i $KeyPath $User@$ServerIP $DeployCmd

# 4. Cleanup
Remove-Item $ZipPath
Remove-Item $TempDir -Recurse -Force

Write-Host "Fundamentos desplegado con exito en $ServerIP!" -ForegroundColor Green
Write-Host "Acceso: http://fundamentos.$ServerIP.nip.io" -ForegroundColor Green
