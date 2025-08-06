const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Nueva funcionalidad
        'fix', // Corrección de bugs
        'docs', // Documentación
        'style', // Cambios de formato (no afectan la lógica)
        'refactor', // Refactorización de código
        'test', // Añadir o modificar tests
        'chore', // Tareas de mantenimiento
        'perf', // Mejoras de rendimiento
        'ci', // Cambios en CI/CD
        'build', // Cambios en el build system
        'revert', // Revertir commits
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
  },
};

module.exports = config;
