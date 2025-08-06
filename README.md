# Rick and Morty App 🚀

Una aplicación Next.js con React para explorar el universo de Rick and Morty, implementada con Git Flow y despliegue automático en Firebase Hosting.

## 🛠️ Tecnologías

- **Next.js 15.4.6** - Framework de React
- **React 19.1.0** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **Firebase Hosting** - Hosting y despliegue
- **GitHub Actions** - CI/CD automático

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

## 📁 Estructura del Proyecto

```
rickandmorty/
├── src/app/           # Páginas y componentes de Next.js
├── public/            # Archivos estáticos
├── .github/workflows/ # GitHub Actions
├── out/               # Build de producción (generado)
├── firebase.json      # Configuración de Firebase
├── next.config.ts     # Configuración de Next.js
└── package.json       # Dependencias y scripts
```

## 🤝 Contribución

1. Crear una nueva feature branch desde `develop`
2. Desarrollar la funcionalidad
3. Crear Pull Request hacia `develop`
4. Revisar y aprobar el PR
5. Hacer merge a `develop` (deployment automático a staging)
6. Para release a producción, crear release branch y merge a `main`

## 📝 Convenciones de Commits

Utilizar [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bugs
- `docs:` - Actualización de documentación
- `style:` - Cambios de formato
- `refactor:` - Refactorización de código
- `test:` - Añadir o actualizar tests
- `chore:` - Tareas de mantenimiento
