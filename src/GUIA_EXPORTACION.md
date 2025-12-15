# 📦 GUÍA DE EXPORTACIÓN - TRAVELSHOP PARTNER PORTAL

## 🎯 Resumen del Proyecto

**Nombre:** TravelShop Partner Portal  
**Descripción:** Sistema de Gestión de Tours (TMS) con AI Travel Assistant integrado  
**Tecnologías:** React + TypeScript + Tailwind CSS + shadcn/ui  
**Archivos Totales:** ~70 archivos  
**Líneas de Código:** ~15,000 líneas  

---

## 📋 LISTA COMPLETA DE ARCHIVOS

### ✅ Archivos Principales (Ya creados en Figma Make)
Estos archivos YA EXISTEN en tu proyecto actual:

```
/App.tsx
/styles/globals.css
/components/layout.tsx
/components/sidebar.tsx
/components/topbar.tsx
/components/status-badge.tsx
/components/AITravelAssistant.tsx
/components/LiveChatWidget.tsx
/components/ReservationPDFPreview.tsx
/components/SmartSearchWizard.tsx
/components/TourRouteMap.tsx
/data/tours-data.ts
/pages/landing.tsx
/pages/login.tsx
/pages/dashboard.tsx
/pages/tours-list.tsx
/pages/tour-detail-new.tsx
/pages/booking-form.tsx
/pages/reservations-list.tsx
/pages/reservation-detail-new.tsx
/pages/resources-list-new.tsx
/pages/resource-detail.tsx
/pages/training-hub.tsx
/pages/training-video.tsx
```

### 📦 Componentes UI (shadcn/ui - Ya creados)
```
/components/ui/button.tsx
/components/ui/card.tsx
/components/ui/input.tsx
/components/ui/label.tsx
/components/ui/badge.tsx
/components/ui/avatar.tsx
/components/ui/dialog.tsx
/components/ui/tabs.tsx
/components/ui/select.tsx
/components/ui/calendar.tsx
/components/ui/accordion.tsx
/components/ui/alert.tsx
/components/ui/alert-dialog.tsx
/components/ui/aspect-ratio.tsx
/components/ui/breadcrumb.tsx
/components/ui/carousel.tsx
/components/ui/chart.tsx
/components/ui/checkbox.tsx
/components/ui/collapsible.tsx
/components/ui/command.tsx
/components/ui/context-menu.tsx
/components/ui/drawer.tsx
/components/ui/dropdown-menu.tsx
/components/ui/form.tsx
/components/ui/hover-card.tsx
/components/ui/input-otp.tsx
/components/ui/menubar.tsx
/components/ui/navigation-menu.tsx
/components/ui/pagination.tsx
/components/ui/popover.tsx
/components/ui/progress.tsx
/components/ui/radio-group.tsx
/components/ui/resizable.tsx
/components/ui/scroll-area.tsx
/components/ui/separator.tsx
/components/ui/sheet.tsx
/components/ui/sidebar.tsx
/components/ui/skeleton.tsx
/components/ui/slider.tsx
/components/ui/sonner.tsx
/components/ui/switch.tsx
/components/ui/table.tsx
/components/ui/textarea.tsx
/components/ui/toggle.tsx
/components/ui/toggle-group.tsx
/components/ui/tooltip.tsx
/components/ui/use-mobile.ts
/components/ui/utils.ts
```

---

## 🚀 CÓMO EXPORTAR EL PROYECTO

### Opción 1: Desde Figma Make (Recomendado)

Si estás en Figma Make, puedes usar el sistema de archivos actual.  
**Todos los archivos ya están disponibles en tu proyecto.**

### Opción 2: Recrear en un proyecto local

#### Paso 1: Crear estructura de carpetas

```bash
mkdir travelshop-portal
cd travelshop-portal
npm create vite@latest . -- --template react-ts
npm install
```

#### Paso 2: Instalar dependencias

```bash
npm install tailwindcss@latest postcss@latest autoprefixer@latest
npm install lucide-react
npm install sonner@2.0.3
npm install react-hook-form@7.55.0
npm install @radix-ui/react-avatar
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-select
npm install @radix-ui/react-tabs
npm install @radix-ui/react-tooltip
npm install @radix-ui/react-accordion
npm install @radix-ui/react-alert-dialog
npm install @radix-ui/react-popover
npm install @radix-ui/react-scroll-area
npm install @radix-ui/react-separator
npm install @radix-ui/react-label
npm install @radix-ui/react-checkbox
npm install @radix-ui/react-switch
npm install @radix-ui/react-slider
```

#### Paso 3: Copiar archivos

Usa la herramienta de lectura de archivos de Figma Make para copiar cada archivo:

1. **Archivos principales:**
   - `/App.tsx`
   - `/styles/globals.css`

2. **Componentes:**
   - `/components/layout.tsx`
   - `/components/sidebar.tsx`
   - `/components/topbar.tsx`
   - `/components/AITravelAssistant.tsx`
   - ... (todos los demás)

3. **Páginas:**
   - `/pages/landing.tsx`
   - `/pages/dashboard.tsx`
   - `/pages/tours-list.tsx`
   - ... (todas las páginas)

4. **Data:**
   - `/data/tours-data.ts`

---

## 📄 ARCHIVOS CRÍTICOS CON CÓDIGO COMPLETO

### 1. `/package.json` (Crear este archivo)

```json
{
  "name": "travelshop-portal",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.294.0",
    "sonner": "^2.0.3",
    "react-hook-form": "^7.55.0",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-slider": "^1.1.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "tailwindcss": "^4.0.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

### 2. `/tailwind.config.js` (Crear este archivo)

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3. `/vite.config.ts` (Crear este archivo)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

### 4. `/tsconfig.json` (Crear este archivo)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 5. `/index.html` (Crear este archivo)

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TravelShop Partner Portal</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
```

### 6. `/main.tsx` (Crear este archivo)

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## 🔑 CARACTERÍSTICAS PRINCIPALES DEL PROYECTO

### 1. **AI Travel Assistant** (`/components/AITravelAssistant.tsx`)
- Conversación inteligente paso a paso
- Sistema de scoring para matching de tours
- Quick replies interactivos
- Muestra tarjetas visuales de tours
- Integrado en landing y portal admin

**Flujo de conversación:**
1. Pregunta destino → 2. Pregunta personas → 3. Pregunta tipo de viaje → 4. Pregunta presupuesto → 5. Muestra tours recomendados

### 2. **Base de Datos de Tours** (`/data/tours-data.ts`)
- 12 tours completos
- Destinos: Caribe, Europa, Sudamérica, Norteamérica, Asia, etc.
- Cada tour incluye:
  - Información básica (nombre, precio, duración)
  - Galería de imágenes (3-4 fotos)
  - Itinerario día por día
  - Mapa de ruta con coordenadas
  - Highlights, incluido/no incluido
  - Recomendaciones

### 3. **Navegación y Estructura**
- **Landing Page:** Hero, destinos, plataforma, recursos, capacitación
- **Portal Admin:** Dashboard, Tours, Reservas, Recursos, Capacitación
- **Componentes:** Layout, Sidebar, Topbar, AI Assistant

### 4. **Colores Corporativos**
```css
--color-primary-600: #C9284B; /* Rojo carmesí */
--color-secondary-600: #2B3E77; /* Azul navy */
```

---

## 📱 CÓMO ACCEDER AL CÓDIGO EN FIGMA MAKE

### Método 1: Copiar archivos individuales

1. Abre el proyecto en Figma Make
2. En el panel izquierdo, encuentra el archivo que necesitas
3. Haz clic para abrirlo
4. Selecciona todo el código (Ctrl/Cmd + A)
5. Copia (Ctrl/Cmd + C)
6. Pega en tu editor local

### Método 2: Usar la herramienta de lectura de archivos

Si estás interactuando conmigo (el AI), puedes pedirme que lea cualquier archivo:

Ejemplo:
- "Muéstrame el código de `/components/AITravelAssistant.tsx`"
- "Lee el archivo `/data/tours-data.ts`"
- "Copia todo el código de `/pages/dashboard.tsx`"

---

## 🎨 ASSETS E IMÁGENES

### Imágenes de Figma (figma:asset)
El proyecto usa imágenes importadas desde Figma con el esquema `figma:asset/`:

```tsx
import logoImage from "figma:asset/b0068d10880ef77f72866c01e1cd0f92ea3daf5f.png";
import heroImage from "figma:asset/8690bdbde4b2c291c1c6c69b9bb3e7729fab7030.png";
```

**Para exportar a proyecto local:** Reemplaza estas importaciones con rutas a imágenes locales o URLs de Unsplash.

### Imágenes de Tours (Unsplash)
Todas las imágenes de tours usan URLs de Unsplash y están incluidas en `/data/tours-data.ts`.

---

## 📊 ESTADÍSTICAS DEL PROYECTO

- **Total de archivos:** ~70
- **Componentes personalizados:** 10
- **Componentes UI (shadcn):** 50+
- **Páginas:** 12
- **Tours en BD:** 12
- **Líneas de código:** ~15,000
- **Destinos:** 9 regiones
- **Categorías de tours:** 6

---

## ✅ CHECKLIST DE EXPORTACIÓN

- [ ] Copiar `/App.tsx`
- [ ] Copiar `/styles/globals.css`
- [ ] Copiar todos los componentes de `/components/`
- [ ] Copiar todas las páginas de `/pages/`
- [ ] Copiar `/data/tours-data.ts`
- [ ] Copiar todos los componentes UI de `/components/ui/`
- [ ] Crear `package.json`
- [ ] Crear `tailwind.config.js`
- [ ] Crear `vite.config.ts`
- [ ] Crear `tsconfig.json`
- [ ] Crear `index.html`
- [ ] Crear `main.tsx`
- [ ] Instalar dependencias con `npm install`
- [ ] Correr proyecto con `npm run dev`
- [ ] Reemplazar imágenes figma:asset con URLs o archivos locales

---

## 🆘 NECESITAS AYUDA

Si necesitas el código completo de algún archivo específico, puedes:

1. **Pedirme que lea el archivo:** "Muéstrame el código de [nombre del archivo]"
2. **Pedirme que cree un archivo nuevo:** "Crea un archivo con todo el código de [componente]"
3. **Pedirme archivos por categoría:** "Dame todos los archivos de /pages/"

---

## 🎯 PRÓXIMOS PASOS RECOMENDADOS

1. **Copiar archivos críticos primero:**
   - `/App.tsx`
   - `/components/AITravelAssistant.tsx`
   - `/data/tours-data.ts`
   - `/pages/landing.tsx`
   - `/pages/dashboard.tsx`

2. **Crear estructura base:**
   - `package.json`
   - `tailwind.config.js`
   - Archivos de configuración

3. **Instalar dependencias y probar**

4. **Copiar resto de archivos gradualmente**

---

**Fecha de creación:** 2024-12-12  
**Versión:** 1.0.0  
**Creado por:** AI Assistant  

¿Necesitas que te proporcione el código completo de algún archivo específico?
