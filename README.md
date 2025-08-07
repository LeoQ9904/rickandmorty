# Rick and Morty Explorer 🚀👽

Una aplicación web moderna desarrollada con Next.js que permite explorar el universo de Rick and Morty de manera interactiva. Los usuarios pueden navegar por personajes, episodios y ubicaciones, agregar elementos a favoritos y disfrutar de una experiencia de usuario fluida y responsive.

## ✨ Funcionalidades Principales

### 🎭 Exploración de Personajes

- **Lista de Personajes**: Visualiza todos los personajes de la serie con información detallada
- **Detalle de Personaje**: Ve información completa incluyendo estado, especie, género, origen y ubicación
- **Favoritos de Personajes**: Guarda tus personajes favoritos con persistencia local

### 📺 Exploración de Episodios

- **Lista de Episodios**: Navega por todos los episodios de la serie
- **Detalle de Episodio**: Ve información completa del episodio, incluyendo personajes que aparecen
- **Favoritos de Episodios**: Marca episodios como favoritos

### 🌍 Exploración de Ubicaciones

- **Lista de Ubicaciones**: Descubre todas las ubicaciones del universo Rick and Morty
- **Detalle de Ubicación**: Ve información completa incluyendo residentes y episodios relacionados
- **Favoritos de Ubicaciones**: Guarda tus ubicaciones favoritas

### ⭐ Sistema de Favoritos

- **Gestión Unificada**: Sistema centralizado para manejar favoritos de personajes, episodios y ubicaciones
- **Persistencia**: Los favoritos se guardan localmente usando Zustand con persistencia
- **Interfaz Intuitiva**: Botones de favorito con iconos intuitivos y feedback visual

### 🎨 Experiencia de Usuario

- **Diseño Responsive**: Optimizado para dispositivos móviles, tablets y desktop
- **Interfaz Moderna**: Diseño atractivo con Tailwind CSS
- **Navegación Fluida**: Routing con App Router de Next.js 15
- **Estados de Carga**: Componentes de loading y manejo de errores
- **Feedback Visual**: Animaciones y transiciones suaves

## 🛠️ Stack Tecnológico

### Frontend Framework

- **Next.js 15.4.6** - Framework de React con App Router
- **React 19.1.0** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para mayor robustez

### Styling y UI

- **Tailwind CSS 4.x** - Framework de CSS utility-first
- **CSS Modules** - Estilos con scope local
- **Responsive Design** - Diseño adaptativo para todos los dispositivos

### Estado y Datos

- **Zustand 5.0.7** - Gestión de estado ligera y performante
- **Rick and Morty API** - API REST para obtener datos de la serie
- **Custom Hooks** - Hooks personalizados para fetching de datos
- **Local Storage** - Persistencia de favoritos en el navegador

### Calidad de Código

- **ESLint** - Linter con reglas de Next.js y TypeScript
- **Prettier** - Formateador de código automático
- **Husky** - Git hooks para automatizar tareas
- **Lint-staged** - Ejecutar linters solo en archivos staged
- **Commitlint** - Validación de mensajes de commit con Conventional Commits

### CI/CD y Hosting

- **Firebase Hosting** - Hosting optimizado para SPAs
- **GitHub Actions** - Pipelines de CI/CD automático
- **Git Flow** - Flujo de trabajo con ramas feature/release/hotfix
- **Preview Deployments** - URLs de preview para Pull Requests

### Herramientas de Desarrollo

- **Turbopack** - Bundler ultra-rápido para desarrollo
- **Hot Reload** - Recarga automática en desarrollo
- **Type Safety** - Tipado completo con TypeScript
- **VS Code Integration** - Configuración optimizada para VS Code

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
src/
├── app/                    # App Router de Next.js 15
│   ├── characters/         # Páginas de personajes
│   ├── episodes/          # Páginas de episodios
│   ├── locations/         # Páginas de ubicaciones
│   └── favorites/         # Página de favoritos
├── components/            # Componentes reutilizables
│   ├── character/         # Componentes específicos de personajes
│   ├── episodes/          # Componentes específicos de episodios
│   └── locations/         # Componentes específicos de ubicaciones
├── hooks/                 # Custom hooks
├── providers/             # Servicios de API y providers
├── stores/                # Estado global con Zustand
└── types/                 # Definiciones de tipos TypeScript
```

### Patrones de Diseño Implementados

- **Custom Hooks**: Encapsulación de lógica de fetching y estado
- **Provider Pattern**: Centralización de servicios de API
- **Component Composition**: Componentes modulares y reutilizables
- **State Management**: Estado global con Zustand para favoritos
- **TypeScript First**: Tipado estricto en toda la aplicación

## 🚀 Desarrollo Local

Instalar dependencias:

```bash
npm install
```

Ejecutar en modo desarrollo:

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## 📋 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo con Turbopack
- `npm run build` - Construir para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linter de código
- `npm run lint:fix` - Ejecuta ESLint y corrige problemas automáticamente
- `npm run format` - Formatea el código con Prettier
- `npm run format:check` - Verifica si el código está formateado correctamente

## 🛠️ Herramientas de Calidad de Código

### Husky

Los git hooks están configurados para:

- **pre-commit**: Ejecuta lint-staged (ESLint + Prettier automáticamente)
- **commit-msg**: Valida el formato del mensaje de commit

### ESLint

Configurado con:

- Next.js y TypeScript rules
- Reglas de accesibilidad
- Detección de código no utilizado
- Mejores prácticas de React

### Prettier

Configurado para:

- Formato consistente del código
- Comillas simples
- Punto y coma al final
- Ancho de línea de 80 caracteres

### Lint-staged

Ejecuta automáticamente antes de cada commit:

- ESLint con auto-fix en archivos JS/TS/JSX/TSX
- Prettier en todos los archivos soportados

### Commitlint

Valida que los mensajes de commit sigan las [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bugs
- `docs:` - Actualización de documentación
- `style:` - Cambios de formato
- `refactor:` - Refactorización de código
- `test:` - Añadir o actualizar tests
- `chore:` - Tareas de mantenimiento
- `perf:` - Mejoras de rendimiento
- `ci:` - Cambios en CI/CD
- `build:` - Cambios en el build system
- `revert:` - Revertir commits

## 🌊 Git Flow

Este proyecto utiliza Git Flow para organizar el desarrollo:

### Ramas Principales

- **`main`** - Código de producción estable
- **`develop`** - Rama de integración para desarrollo

### Flujo de Trabajo

#### 1. Desarrollar Nueva Característica

```bash
# Crear nueva feature desde develop
git flow feature start nombre-caracteristica

# Desarrollar la característica...
# git add . && git commit -m "feat: nueva característica"

# Finalizar feature (merge automático a develop)
git flow feature finish nombre-caracteristica
```

#### 2. Preparar Release

```bash
# Crear release desde develop
git flow release start v1.0.0

# Hacer ajustes finales...

# Finalizar release (merge a main y develop, crear tag)
git flow release finish v1.0.0
```

#### 3. Hotfix de Emergencia

```bash
# Crear hotfix desde main
git flow hotfix start nombre-hotfix

# Arreglar el problema...

# Finalizar hotfix (merge a main y develop)
git flow hotfix finish nombre-hotfix
```

## 🚀 Despliegue Automático

### Configuración de Firebase

El proyecto está configurado para desplegarse automáticamente en Firebase Hosting usando GitHub Actions:

- **Staging**: Se despliega automáticamente cuando pusheas a `develop`
- **Production**: Se despliega automáticamente cuando haces merge a `main`
- **Preview**: Se crea una URL de preview para cada Pull Request

### URLs de Despliegue

- **Production**: https://rick-and-morty-1dad6.web.app
- **Staging**: https://rick-and-morty-1dad6--staging.web.app

### Workflows de GitHub Actions

1. **Deploy to Production** (`firebase-hosting-merge.yml`)
   - Se ejecuta en push a `main`
   - Despliega al canal `live` de Firebase

2. **Deploy to Staging** (`deploy-staging.yml`)
   - Se ejecuta en push a `develop`
   - Despliega al canal `staging` de Firebase

3. **Preview Deployments** (`firebase-hosting-pull-request.yml`)
   - Se ejecuta en Pull Requests
   - Crea URLs de preview temporales

## 🔧 Configuración de Firebase

El proyecto está configurado con:

- **Hosting**: Archivos estáticos servidos desde la carpeta `out`
- **Rewrites**: SPA routing configurado para Next.js
- **Service Account**: Configurado en los secrets de GitHub

## 💻 Configuración del Editor

Se recomienda usar VS Code con las extensiones:

- **ESLint** - Linting en tiempo real
- **Prettier** - Formateo automático
- **Tailwind CSS IntelliSense** - Autocompletado de clases

La configuración del workspace ya está incluida en `.vscode/settings.json` con:

- Formateo automático al guardar
- Auto-fix de ESLint al guardar
- Configuración de Prettier como formateador por defecto

## 📁 Estructura Detallada

```
rickandmorty/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── characters/         # Rutas de personajes
│   │   │   ├── page.tsx       # Lista de personajes
│   │   │   └── [id]/page.tsx  # Detalle de personaje
│   │   ├── episodes/          # Rutas de episodios
│   │   │   ├── page.tsx       # Lista de episodios
│   │   │   └── [id]/page.tsx  # Detalle de episodio
│   │   ├── locations/         # Rutas de ubicaciones
│   │   │   ├── page.tsx       # Lista de ubicaciones
│   │   │   └── [id]/page.tsx  # Detalle de ubicación
│   │   ├── favorites/         # Página de favoritos
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Página de inicio
│   ├── components/            # Componentes UI
│   │   ├── character/         # Componentes de personajes
│   │   │   ├── List.tsx       # Lista de personajes
│   │   │   └── Detail.tsx     # Detalle de personaje
│   │   ├── episodes/          # Componentes de episodios
│   │   ├── locations/         # Componentes de ubicaciones
│   │   ├── FavoriteButton.tsx # Botón de favoritos
│   │   ├── Nav.tsx           # Navegación
│   │   └── Loading.tsx       # Estados de carga
│   ├── hooks/                 # Custom hooks
│   │   └── useFavorites.ts   # Hook de favoritos
│   ├── providers/            # Servicios de API
│   │   ├── rickandmorty-api.ts # Cliente de API
│   │   └── hooks.ts          # Hooks de fetching
│   ├── stores/               # Estado global
│   │   └── favoritesStore.ts # Store de favoritos
│   └── types/                # Tipos TypeScript
│       └── index.ts          # Definiciones de tipos
├── public/                   # Assets estáticos
├── .github/workflows/        # GitHub Actions
├── .vscode/                  # Configuración VS Code
├── firebase.json            # Configuración Firebase
├── next.config.ts           # Configuración Next.js
├── tailwind.config.ts       # Configuración Tailwind
├── tsconfig.json           # Configuración TypeScript
└── package.json            # Dependencias y scripts
```

## 🔌 APIs y Servicios

### Rick and Morty API

- **Base URL**: `https://rickandmortyapi.com/api`
- **Endpoints utilizados**:
  - `/character` - Lista y detalles de personajes
  - `/episode` - Lista y detalles de episodios
  - `/location` - Lista y detalles de ubicaciones
- **Características**:
  - API REST pública y gratuita
  - Paginación automática
  - Filtros y búsqueda
  - Datos completos y actualizados

### Servicios de Terceros

- **Firebase Hosting**: Hosting estático con CDN global
- **GitHub Actions**: CI/CD automatizado
- **Vercel Analytics** (opcional): Métricas de rendimiento

## 🤝 Contribución

1. Crear una nueva feature branch desde `develop`
2. Desarrollar la funcionalidad
3. Crear Pull Request hacia `develop`
4. Revisar y aprobar el PR
5. Hacer merge a `develop` (deployment automático a staging)
6. Para release a producción, crear release branch y merge a `main`

**Nota**: Los hooks de Git se encargarán automáticamente de:

- Formatear tu código con Prettier
- Ejecutar ESLint y auto-fix
- Validar que los mensajes de commit sigan las convenciones

## 🎯 Ejemplo de Flujo Completo

```bash
# 1. Crear feature branch
git flow feature start nueva-funcionalidad

# 2. Desarrollar (los hooks se ejecutan automáticamente en cada commit)
git add .
git commit -m "feat: add new character search functionality"

# 3. Finalizar feature
git flow feature finish nueva-funcionalidad

# 4. Push develop para deployal staging automático
git push origin develop
```
