// vite.config.js
import { defineConfig } from "file:///C:/ProyectosGit/fundamentosdecomputacion/node_modules/vite/dist/node/index.js";
import react from "file:///C:/ProyectosGit/fundamentosdecomputacion/node_modules/@vitejs/plugin-react/dist/index.js";
import { VitePWA } from "file:///C:/ProyectosGit/fundamentosdecomputacion/node_modules/vite-plugin-pwa/dist/index.js";
var isGithubPages = process.env.GITHUB_ACTIONS === "true";
var vite_config_default = defineConfig({
  base: isGithubPages ? "/fundamentosdecomputacion/" : "/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "Fundamentos de Computaci\xF3n",
        short_name: "Fundamentos",
        description: "Plataforma educativa de arquitectura de computadoras",
        theme_color: "#004a99",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxQcm95ZWN0b3NHaXRcXFxcZnVuZGFtZW50b3NkZWNvbXB1dGFjaW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxQcm95ZWN0b3NHaXRcXFxcZnVuZGFtZW50b3NkZWNvbXB1dGFjaW9uXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Qcm95ZWN0b3NHaXQvZnVuZGFtZW50b3NkZWNvbXB1dGFjaW9uL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnXG5cbmNvbnN0IGlzR2l0aHViUGFnZXMgPSBwcm9jZXNzLmVudi5HSVRIVUJfQUNUSU9OUyA9PT0gJ3RydWUnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYXNlOiBpc0dpdGh1YlBhZ2VzID8gJy9mdW5kYW1lbnRvc2RlY29tcHV0YWNpb24vJyA6ICcvJyxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgVml0ZVBXQSh7XG4gICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcbiAgICAgIGluY2x1ZGVBc3NldHM6IFsnZmF2aWNvbi5pY28nLCAnYXBwbGUtdG91Y2gtaWNvbi5wbmcnLCAnbWFzay1pY29uLnN2ZyddLFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogJ0Z1bmRhbWVudG9zIGRlIENvbXB1dGFjaVx1MDBGM24nLFxuICAgICAgICBzaG9ydF9uYW1lOiAnRnVuZGFtZW50b3MnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1BsYXRhZm9ybWEgZWR1Y2F0aXZhIGRlIGFycXVpdGVjdHVyYSBkZSBjb21wdXRhZG9yYXMnLFxuICAgICAgICB0aGVtZV9jb2xvcjogJyMwMDRhOTknLFxuICAgICAgICBpY29uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ3B3YS0xOTJ4MTkyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzE5MngxOTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ3B3YS01MTJ4NTEyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9KVxuICBdLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1QsU0FBUyxvQkFBb0I7QUFDN1UsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUV4QixJQUFNLGdCQUFnQixRQUFRLElBQUksbUJBQW1CO0FBRXJELElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU0sZ0JBQWdCLCtCQUErQjtBQUFBLEVBQ3JELFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLGVBQWUsQ0FBQyxlQUFlLHdCQUF3QixlQUFlO0FBQUEsTUFDdEUsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsYUFBYTtBQUFBLFFBQ2IsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
