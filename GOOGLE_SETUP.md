# Cómo obtener Credenciales de Google Permanentes

Para que tu aplicación pueda conectarse a Google Drive sin interrupciones, necesitas configurar un proyecto en Google Cloud Platform (GCP).

## 1. Crear un Proyecto
1. Ve a [Google Cloud Console](https://console.cloud.google.com/).
2. Haz clic en el selector de proyectos (arriba a la izquierda) y selecciona **"Nuevo Proyecto"**.
3. Ponle un nombre (ej. "GACP App") y haz clic en **Crear**.

## 2. Habilitar la API de Google Drive
1. En el menú lateral, ve a **"APIs y servicios" > "Biblioteca"**.
2. Busca **"Google Drive API"**.
3. Haz clic en el resultado y luego en **"Habilitar"**.

## 3. Configurar la Pantalla de Consentimiento (Importante para "Permanente")
Aquí es donde defines quién puede usar la app. Ve a **"APIs y servicios" > "Pantalla de consentimiento de OAuth"**.

### Opción A: Uso Interno (Recomendado si tienes G Suite / Workspace)
*   **User Type**: Selecciona **Interno**.
*   **Ventaja**: Solo usuarios de tu organización pueden entrar, pero **no requiere verificación** de Google y el acceso es permanente.
*   **Requisito**: Debes tener un correo corporativo (no @gmail.com).

### Opción B: Uso Externo (Si usas @gmail.com personal)
*   **User Type**: Selecciona **Externo**.
*   **Estado de publicación**:
    *   **"Testing" (Pruebas)**: Cualquiera que añadas a la lista de "Usuarios de prueba" puede entrar. **Limitación**: El acceso caduca a los 7 días y hay que volver a loguearse.
    *   **"Production" (Producción)**: Para que sea permanente y para cualquier usuario, Google debe **verificar** tu app (proceso largo).
*   **Solución rápida**: Usa "Testing" y simplemente vuelve a loguearte cada semana, o inicia el proceso de verificación si necesitas algo definitivo para clientes externos.

**Pasos de configuración:**
1. Rellena "Nombre de la aplicación" y correos de contacto.
2. **Scopes (Alcance)**: Añade `.../auth/drive.file` (y `email`, `profile`).
3. **Usuarios de prueba** (Solo si elegiste Externo/Testing): Añade tu propio correo.

## 4. Crear las Credenciales (Client ID y Secret)
1. Ve a **"APIs y servicios" > "Credenciales"**.
2. Haz clic en **"Crear credenciales" > "ID de cliente de OAuth"**.
3. **Tipo de aplicación**: Aplicación web.
4. **Orígenes autorizados de JavaScript**:
    *   Local: `http://localhost:3000`
    *   Producción: `https://tu-dominio.com`
5. **URI de redireccionamiento autorizados**:
    *   Local: `http://localhost:3000/api/auth/callback/google`
    *   Producción: `https://tu-dominio.com/api/auth/callback/google`
6. Haz clic en **Crear**.

## 5. Copiar Credenciales
Copia el **ID de cliente** y el **Secreto de cliente** y pégalos en tu archivo `.env.local` (en local) o en el `.env.local` de tu servidor VPS.

```env
GOOGLE_CLIENT_ID=tu-id-copiado
GOOGLE_CLIENT_SECRET=tu-secreto-copiado
```
