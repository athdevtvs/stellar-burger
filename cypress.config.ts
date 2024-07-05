import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:4000',
    experimentalRunAllSpecs: true
  },
  env: {
    apiUrl: 'https://norma.nomoreparties.space/api'
  }
});
