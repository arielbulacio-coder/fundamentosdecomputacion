$ServerIP = "149.50.130.160"
$User = "root"
$KeyPath = "c:\ProyectosGit\consultora\keys\id_ed25519_donweb"
$RemoteBase = "/root"
$App = "fundamentos"
$ZipPath = "$env:TEMP\dist_super_nuclear.zip"

Write-Host "Super Nuclear Build: Local build..." -ForegroundColor Cyan
npm run build

if (Test-Path "$env:TEMP\stage_nuclear") { Remove-Item -Recurse -Force "$env:TEMP\stage_nuclear" }
New-Item -ItemType Directory -Path "$env:TEMP\stage_nuclear" | Out-Null
Copy-Item -Path "dist" -Destination "$env:TEMP\stage_nuclear" -Recurse
Copy-Item -Path "Dockerfile.nuclear" -Destination "$env:TEMP\stage_nuclear\Dockerfile"
Copy-Item -Path "docker-compose.yml" -Destination "$env:TEMP\stage_nuclear"
Copy-Item -Path "nginx-spa.conf" -Destination "$env:TEMP\stage_nuclear"

Write-Host "Zipping..."
if (Test-Path $ZipPath) { Remove-Item $ZipPath }
Compress-Archive -Path "$env:TEMP\stage_nuclear\*" -DestinationPath $ZipPath

Write-Host "Server Cleanup..."
ssh -o StrictHostKeyChecking=no -i $KeyPath "$User@$ServerIP" "docker compose -f $RemoteBase/$App/docker-compose.yml down ; rm -rf $RemoteBase/$App/*"

Write-Host "Uploading bundle..."
scp -o StrictHostKeyChecking=no -i $KeyPath $ZipPath "$User@$ServerIP`:$RemoteBase/$App.zip"

Write-Host "Extracting and Starting..."
$DeployCmd = "cd $RemoteBase/$App && unzip -o ../$App.zip && docker compose build --no-cache && docker compose up -d --force-recreate"
ssh -o StrictHostKeyChecking=no -i $KeyPath $User@$ServerIP $DeployCmd

Write-Host "SUPER NUCLEAR DEPLOY SUCCESSFUL!" -ForegroundColor Green
