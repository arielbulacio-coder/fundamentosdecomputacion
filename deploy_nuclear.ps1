$ServerIP = "149.50.130.160"
$User = "root"
$KeyPath = "c:\ProyectosGit\consultora\keys\id_ed25519_donweb"
$RemoteBase = "/root"
$App = "fundamentos"
$ZipPath = "dist_nuclear.zip"

Write-Host "Nuclear Build: Clearing local dist and rebuilding..."
if (Test-Path "dist") { Remove-Item -Recurse -Force "dist" }
npm run build

Write-Host "Zipping..."
Compress-Archive -Path "dist\*" -DestinationPath $ZipPath -Force

Write-Host "Nuclear Server Cleanup: Stopping container and deleting old files..."
ssh -o StrictHostKeyChecking=no -i $KeyPath "$User@$ServerIP" "docker stop fundamentos-app ; docker rm fundamentos-app ; rm -rf $RemoteBase/$App/dist"

Write-Host "Uploading fresh bundle..."
scp -o StrictHostKeyChecking=no -i $KeyPath $ZipPath "$User@$ServerIP`:$RemoteBase/$App/dist.zip"

Write-Host "Unzipping and Starting fresh..."
$DeployCmd = "cd $RemoteBase/$App && mkdir -p dist && unzip -o dist.zip -d dist && docker compose up -d --force-recreate"
ssh -o StrictHostKeyChecking=no -i $KeyPath $User@$ServerIP $DeployCmd

Write-Host "NUCLEAR DEPLOY SUCCESSFUL!"
