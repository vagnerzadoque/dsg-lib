import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Configuração para buildar a biblioteca de componentes DSG com múltiplos formatos
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // Caminho absoluto para o ponto de entrada da lib
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'DsgLib', // Nome usado no build UMD como variável global (ex: window.DsgLib)
      formats: ['es', 'cjs', 'umd'], // Gera saída para diferentes ambientes
      fileName: (format) => `dsg-lib.${format}.js` // Nome do arquivo final por formato
    },
    sourcemap: true, // Gera sourcemaps para facilitar debugging
    minify: 'esbuild', // Minificação rápida e eficiente
    rollupOptions: {
      // Evita incluir essas libs no bundle final (consumidor deve fornecer)
      external: ['react', 'react-dom'],
      output: {
        // Mapeia as libs externas para variáveis globais (usado no formato UMD)
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});
