// Importa o Zone.js, necessário para o Angular
import 'zone.js';  // Included with Angular CLI.

// Define 'global' para evitar o erro "global is not defined"
(window as any).global = window;

// Aqui você pode adicionar outros polyfills conforme necessário.