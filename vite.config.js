import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      },
      {
        find: '@abi',
        replacement: path.resolve(__dirname, 'src/abi')
      },
      {
        find: '@utils',
        replacement: path.resolve(__dirname, 'src/utils')
      },
      {
        find: '@contexts',
        replacement: path.resolve(__dirname, 'src/contexts')
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components')
      },
      {
        find: '@pages',
        replacement: path.resolve(__dirname, 'src/pages')
      },
      {
        find: '@assets',
        replacement: path.resolve(__dirname, 'src/assets')
      }
    ]
  }
});
