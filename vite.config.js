// vite.config.js
// Configuración de Vite para desarrollo local y publicación
// dentro de la subcarpeta react_07_React_Router_II.

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
    plugins: [react()],

    // Durante npm run dev se trabaja desde "/".
    // Durante npm run build los recursos se generan para la ruta online.
    base:
        command === "build"
            ? "/react_07_React_Router_II/"
            : "/",
}));