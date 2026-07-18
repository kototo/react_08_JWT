// api.js
// Centraliza la URL del backend y sus endpoints.

export const API_BASE_URL =
    "https://desafiolatam.sinapsolabs.cl/react_04_backend/api";

// Endpoints utilizados por el proyecto.
export const API_ENDPOINTS = {
    pizzas: `${API_BASE_URL}/pizzas`,
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    profile: `${API_BASE_URL}/auth/me`,
    checkouts: `${API_BASE_URL}/checkouts`,
};