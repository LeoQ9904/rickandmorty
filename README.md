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
