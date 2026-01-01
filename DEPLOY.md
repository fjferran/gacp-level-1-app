# Guía de Despliegue en VPS (Hostinger)

Esta guía detalla los pasos para desplegar la aplicación GACP Nivel 1 en un servidor VPS (Ubuntu 22.04/24.04) usando Node.js, PM2 y Nginx.

## Prerrequisitos

1.  **Acceso SSH** al servidor VPS.
2.  **Dominio** apuntando a la IP del servidor (registro A).

## Estructura de la App (2 Niveles)
La aplicación gestiona automáticamente los dos niveles solicitados bajo el mismo dominio:
- **Nivel Gratuito**: Accesible en `https://tu-dominio.com/roadmap`
- **Nivel Completo**: Accesible en `https://tu-dominio.com/screen/ONB_001` (requiere login)
- **Landing Page**: `https://tu-dominio.com/` (redirige a ambos)

No necesitas configurar subdominios separados. Next.js gestiona todo el enrutamiento.

## Paso 1: Preparar el Entorno

Conéctate por SSH y actualiza el sistema:
```bash
ssh root@tu-ip-vps
sudo apt update && sudo apt upgrade -y
```

Instala Node.js (v20 LTS) y npm:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Instala Git, PM2 y Nginx:
```bash
sudo apt install -y git nginx
sudo npm install -g pm2
```

## Paso 2: Clonar y Construir la App

Clona el repositorio (asegúrate de tener acceso o usar HTTPS):
```bash
cd /var/www
git clone https://github.com/tu-usuario/gacp-level-1-app.git
cd gacp-level-1-app
```

Instala dependencias y construye la aplicación:
```bash
npm install
npm run build
```

## Paso 3: Configurar Variables de Entorno

Crea el archivo `.env.local` en el servidor:
```bash
nano .env.local
```

Pega tus credenciales (Google Cloud y Whitelist):
```env
GOOGLE_CLIENT_ID=tu-client-id
GOOGLE_CLIENT_SECRET=tu-client-secret
NEXTAUTH_SECRET=genera-un-secreto-seguro
NEXTAUTH_URL=https://tu-dominio.com
ALLOWED_USERS=usuario1@gmail.com,usuario2@empresa.com
```
Guarda con `Ctrl+O`, `Enter`, `Ctrl+X`.

## Paso 4: Ejecutar con PM2

Inicia la aplicación en el puerto 3000:
```bash
pm2 start npm --name "gacp-app" -- start
pm2 save
pm2 startup
```

## Paso 5: Configurar Nginx (Reverse Proxy)

Crea un archivo de configuración para tu sitio:
```bash
sudo nano /etc/nginx/sites-available/gacp-app
```

Pega el siguiente contenido (reemplaza `tu-dominio.com`):
```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activa el sitio y reinicia Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/gacp-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Paso 6: SSL con Certbot (HTTPS)

Instala Certbot y obtén el certificado SSL gratuito:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d tu-dominio.com
```

¡Listo! Tu aplicación debería estar accesible en `https://tu-dominio.com`.
