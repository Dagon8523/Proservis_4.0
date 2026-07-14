# PROSERVIS S.A.S. — Landing Page Premium

## Stack
- **Next.js 15** + **React 19** + **TypeScript**
- **TailwindCSS** — estilos utility-first con paleta corporativa
- **Framer Motion** — animaciones y transiciones premium
- **Lucide React** — iconografía
- **Nodemailer** — envío de emails (configurable con Resend)

---

## Instalación rápida

```bash
# 1. Clonar / descomprimir el proyecto
cd proservis-landing

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.local.example .env.local
# → Editar .env.local con sus credenciales SMTP

# 4. Ejecutar en desarrollo
npm run dev

# 5. Build para producción
npm run build
npm start
```

---

## Variables de entorno (.env.local)

```env
# Email donde llegan las cotizaciones
CONTACT_EMAIL=proservisvigia@gmail.com

# === Opción 1: Gmail con Nodemailer (recomendado para inicio) ===
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=proservisvigia@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx   # Contraseña de aplicación de Gmail
```

### Cómo obtener contraseña de aplicación Gmail:
1. Ir a myaccount.google.com → Seguridad
2. Activar verificación en 2 pasos
3. Ir a "Contraseñas de aplicación"
4. Generar una para "Correo / Otro"
5. Copiar los 16 caracteres en SMTP_PASS

### Opción 2: Resend (recomendado para producción)
```env
RESEND_API_KEY=re_xxxxxxxxxxxx
```
Modificar `/src/app/api/contact/route.ts` para usar Resend en lugar de Nodemailer.

---

## Estructura de carpetas

```
proservis/
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts     # API de cotización
│   │   ├── globals.css
│   │   ├── layout.tsx               # Metadata SEO + fuentes
│   │   └── page.tsx                 # Página principal
│   ├── components/
│   │   └── sections/
│   │       ├── Header.tsx           # Header sticky con scroll effect
│   │       ├── Hero.tsx             # Hero fullscreen
│   │       ├── WhyUs.tsx            # ¿Por qué elegirnos?
│   │       ├── Services.tsx         # Grid de servicios
│   │       ├── Fleet.tsx            # Nuestra flota (hover reveal)
│   │       ├── Coverage.tsx         # Mapa SVG de cobertura
│   │       ├── CargoTypes.tsx       # Tipos de mercancía
│   │       ├── Process.tsx          # Timeline del proceso
│   │       ├── Stats.tsx            # Contadores animados
│   │       ├── Gallery.tsx          # Galería masonry + lightbox
│   │       ├── About.tsx            # Misión / Visión / Historia / Valores
│   │       ├── ContactCTA.tsx       # CTA final
│   │       ├── ContactForm.tsx      # Formulario de cotización
│   │       └── Footer.tsx           # Footer completo
│   ├── lib/utils.ts
│   └── types/index.ts
├── public/images/                   # Aquí van las fotos reales del cliente
├── tailwind.config.ts
├── next.config.ts
└── .env.local
```

---

## Cómo reemplazar imágenes

### Hero
En `src/components/sections/Hero.tsx` línea con `src="https://images.unsplash.com/..."`:
```tsx
// Reemplazar con imagen local:
src="/images/hero-tractomula.jpg"
```
Subir la foto a: `public/images/hero-tractomula.jpg`

### Galería (trabajos realizados)
En `src/components/sections/Gallery.tsx`, reemplazar el array `galleryImages`:
```tsx
const galleryImages = [
  { src: '/images/trabajo-01.jpg', alt: 'Descripción del trabajo' },
  { src: '/images/trabajo-02.jpg', alt: 'Descripción' },
  // ... etc
]
```

**Tamaños recomendados:**
- Hero: 1920×1080px mínimo, JPG optimizado
- Galería: 800×600px, JPG <200KB por imagen

---

## Personalización de datos

| Dato | Archivo | Variable |
|------|---------|----------|
| Teléfonos | `Footer.tsx`, `ContactForm.tsx`, `Header.tsx` | Hardcoded (buscar ) |
| Correos | `Footer.tsx` | Hardcoded |
| Dirección | `Footer.tsx`, `ContactForm.tsx` | Hardcoded |
| WhatsApp | `Hero.tsx`, `ContactCTA.tsx`, `Header.tsx` | URL wa.me/57XXXXXXXXXX |
| Redes sociales | `Footer.tsx` | href="#" → reemplazar con URLs reales |

---

## Deploy recomendado

### Vercel (más fácil, gratis para proyectos pequeños)
```bash
npm i -g vercel
vercel
# Agregar variables de entorno en el dashboard de Vercel
```

### Variables de entorno en producción
Agregar en Vercel → Settings → Environment Variables:
- `CONTACT_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

---

## Dependencias de producción

```bash
npm install next react react-dom framer-motion lucide-react \
  @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-select \
  @radix-ui/react-toast class-variance-authority clsx tailwind-merge nodemailer
```

```bash
npm install -D @types/node @types/react @types/react-dom @types/nodemailer \
  typescript tailwindcss autoprefixer postcss eslint eslint-config-next
```
