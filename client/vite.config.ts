import { readdirSync } from 'fs';
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const absolutePathAliases: { [key: string]: string } = {};
const srcPath = path.resolve('./src');
readdirSync(srcPath, { withFileTypes: true }).forEach((item) => {
  if (!item.isDirectory()) return;
  absolutePathAliases[item.name] = path.join(srcPath, item.name);
});

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: { ...absolutePathAliases },
  },
  server: {
    port: 8001,
  },
  plugins: [react()],
});
