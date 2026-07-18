// vite.config.js
// Configuración para desarrollo local y publicación
// en la subcarpeta react_08_JWT.

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
    plugins: [react()],

    base:
        command === "build"
            ? "/react_08_JWT/"
            : "/",
}));