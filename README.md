# Telegram Mini App 🚀

Esta es una aplicación web (Mini App) diseñada para ejecutarse de manera fluida y nativa dentro de la aplicación de **Telegram** (disponible en Android, iOS, Desktop y Web), construida con un stack moderno y escalable.

---

## 🛠️ Arquitectura y Tecnologías Utilizadas

Para desarrollar esta Telegram Mini App se seleccionaron las siguientes tecnologías y patrones de arquitectura:

1. **Frontend**:
   - **React 19** + **TypeScript**: Para renderizado modular de interfaces de usuario y tipado estático.
   - **Vite**: Bundler ultra rápido para desarrollo local y construcción optimizada de producción.
   - **Telegram WebApp SDK (`telegram-web-app.js`)**: Permite la integración directa con el cliente de Telegram (`window.Telegram.WebApp`), adaptando automáticamente temas de color (claro/oscuro), botones nativos de Telegram (`MainButton`), datos de usuario (`initDataUnsafe`), y controles del viewport (`expand`, `close`).

2. **Backend / Servidor de Bot**:
   - **Node.js** + **Express**: Servidor backend para servir los archivos estáticos de la app (`dist/`) y endpoints de API/salud (`/api/health`).
   - **grammY**: Framework moderno de bots de Telegram para recibir mensajes, procesar comandos (`/start`) y enviar la interfaz con un teclado Inline (`InlineKeyboard.webApp`), permitiendo al usuario abrir la app directamente desde un chat.

3. **Pruebas y Calidad de Código**:
   - **Vitest** + **React Testing Library** + **jsdom**: Para la ejecución de pruebas unitarias y de componentes.

---

## 📂 Estructura del Proyecto

```
.
├── index.html              # Punto de entrada HTML con el script de Telegram WebApp SDK
├── src/
│   ├── App.tsx             # Componente principal con integración al SDK de Telegram
│   ├── main.tsx            # Punto de entrada de React
│   ├── server.ts           # Servidor Express y Bot de Telegram (grammY)
│   ├── test/
│   │   └── setup.ts        # Configuración Global para Vitest / Testing Library
│   └── __tests__/          # Pruebas unitarias
│       ├── App.test.tsx    # Pruebas del componente React y mock de Telegram WebApp
│       └── server.test.ts # Pruebas del servidor backend y bot
├── package.json            # Dependencias y scripts del proyecto
├── tsconfig.json           # Configuración de TypeScript
└── vite.config.ts          # Configuración de Vite y Vitest
```

---

## 🚀 Guía de Instalación y Requisitos Previos

### Requisitos
- **Node.js** (v18.0.0 o superior)
- **npm** (v9.0.0 o superior)

### Pasos de Instalación

1. Clona el repositorio e instala las dependencias:
   ```bash
   npm install
   ```

---

## ⚙️ Variables de Entorno

Puedes crear un archivo `.env` en la raíz del proyecto para configurar el token de tu bot de Telegram y la URL de la Mini App:

```env
PORT=3000
BOT_TOKEN=tu_token_de_telegram_aqui  # (Obtenido desde @BotFather en Telegram)
WEB_APP_URL=https://tu-dominio-o-ngrok.com
```

---

## 🖥️ Ejecución en Desarrollo y Producción

### 1. Modo Desarrollo (Frontend)
Para ejecutar el servidor de desarrollo de Vite con recarga rápida (HMR):
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

### 2. Ejecutar Servidor Backend y Bot de Telegram
Para iniciar el servidor Express y el Bot de Telegram usando `tsx`:
```bash
npm start
```

### 3. Compilación para Producción
Para validar los tipos de TypeScript y generar el build optimizado de la frontend en la carpeta `dist/`:
```bash
npm run build
```

---

## 🧪 Pruebas Unitarias

El proyecto incluye un suite de pruebas automatizadas escritas en Vitest.

Para ejecutar todas las pruebas:
```bash
npm run test
```

---

## 🤖 Cómo Configurar y Probar dentro de Telegram

1. Habla con [@BotFather](https://t.me/BotFather) en Telegram y crea un nuevo bot con `/newbot`.
2. Guarda el **HTTP API Token** generado.
3. Para probar localmente dentro de Telegram, expón tu puerto local (por ejemplo usando `ngrok` o `localtunnel`):
   ```bash
   npx ngrok http 3000
   ```
4. En `@BotFather`:
   - Usa el comando `/newapp` o configura el comando WebApp del bot.
   - Pega la URL provista por ngrok (`https://xxxx.ngrok-free.app`).
5. Abre el bot en Telegram y ejecuta `/start`. ¡Verás el botón para abrir la Mini App integrada dentro de Telegram!
