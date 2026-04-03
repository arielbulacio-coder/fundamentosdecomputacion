$ServerIP = "149.50.130.160"
$User = "root"
$KeyPath = "c:\ProyectosGit\consultora\keys\id_ed25519_donweb"
$RemoteBase = "/root"
$App = "fundamentos"
$ZipPath = "dist.zip"

Write-Host "Construyendo localmente..."
npm run build
Compress-Archive -Path "dist\*" -DestinationPath $ZipPath -Force

Write-Host "Subiendo dist compilado a DonWeb..."
scp -o StrictHostKeyChecking=no -i $KeyPath $ZipPath "$User@$ServerIP`:$RemoteBase/$App/dist.zip"

# Preparamos los textos para el servidor
$RemoteNginx = @"
server { 
    listen 80; 
    location / { 
        root /usr/share/nginx/html; 
        index index.html; 
        try_files `$uri `$uri/ /index.html; 
    } 
}
"@

$RemoteCompose = @"
version: '3.8'
services:
  fundamentos:
    image: nginx:stable-alpine
    container_name: fundamentos-app
    restart: always
    volumes:
      - ./dist:/usr/share/nginx/html
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    networks:
      - web
networks:
  web:
    external: true
"@

# Subimos los archivos de config primero para no renegar con escapes complejos en ssh
# Usamos ASCII para evitar BOM que rompe Nginx/Docker
$RemoteNginx | Out-File -FilePath nginx.conf -Encoding ascii
$RemoteCompose | Out-File -FilePath docker-compose.yml -Encoding ascii

scp -o StrictHostKeyChecking=no -i $KeyPath nginx.conf docker-compose.yml "$User@$ServerIP`:$RemoteBase/$App/"

$DeployCmd = "cd $RemoteBase/$App && rm -rf dist && unzip -o dist.zip -d dist && docker compose down && docker compose up -d"

ssh -o StrictHostKeyChecking=no -i $KeyPath $User@$ServerIP $DeployCmd

Write-Host "Despliegue con volumen completado el $(Get-Date)!"
