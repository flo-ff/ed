import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  vite: {
    preview: {
      allowedHosts: ['.trycloudflare.com', 'localhost', '127.0.0.1', '.localhost'],
      host: '0.0.0.0',
    },
    server: {
      allowedHosts: ['.trycloudflare.com', 'localhost', '127.0.0.1', '.localhost'],
      host: '0.0.0.0',
    },
  },
});
