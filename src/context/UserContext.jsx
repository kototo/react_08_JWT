// UserContext.jsx
// Context global encargado de administrar la autenticación simulada.
//
// En el Hito 7:
// 1. El token comienza en true.
// 2. logout cambia el token a false.
// 3. login cambia el token nuevamente a true.
// 4. Navbar, Cart y las rutas protegidas consumen el mismo estado.

import React, { createContext, useContext, useState } from "react";

// Creamos el contexto del usuario.
// El valor real será entregado por UserProvider.
const UserContext = createContext(null);

// Hook personalizado para consumir UserContext.
export const useUser = () => {
    const contexto = useContext(UserContext);

    // Validación para detectar si se usa el hook fuera del Provider.
    if (!contexto) {
        throw new Error(
            "useUser debe utilizarse dentro de UserProvider."
        );
    }

    return contexto;
};

// Provider global de autenticación.
export const UserProvider = ({ children }) => {
    // Token simulado.
    // El ejercicio indica que debe comenzar en true.
    const [token, setToken] = useState(true);

    // Simula el inicio de sesión.
    // Se ejecuta cuando Login valida correctamente las credenciales.
    const login = () => {
        setToken(true);
    };

    // Simula el cierre de sesión.
    // Al cambiar a false, Navbar muestra Login y Register.
    const logout = () => {
        setToken(false);
    };

    // Valores disponibles para toda la aplicación.
    const valorContexto = {
        token,
        login,
        logout,
    };

    return (
        <UserContext.Provider value={valorContexto}>
            {children}
        </UserContext.Provider>
    );
};