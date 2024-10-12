import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying API requests to the backend server
      "/api": "http://localhost:5000",
      "/uploads": "http://localhost:5000", // Serve uploads directly
      "/firebase": "https://your-firebase-project-id.cloudfunctions.net", // Example proxy for Firebase functions
    },
    fs: {
      // Allowing access to specific directories
      allow: [
        'C:/Users/Laptop/OneDrive/Desktop/FypAR/frontend', // Allow access to the entire frontend directory
        'C:/Users/Laptop/OneDrive/Desktop/FypAR/frontend/src', // Or just allow access to the src directory
        'C:/Users/Laptop/node_modules/slick-carousel/slick/fonts',
      ],
    },
  },
  assetsInclude: ['**/*.glb'], // Allow importing GLB files as assets
});
