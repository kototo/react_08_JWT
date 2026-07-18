// UserContext.jsx
// Context global encargado de administrar la autenticación real con JWT.
//
// En el Hito 8:
// 1. login consume POST /api/auth/login.
// 2. register consume POST /api/auth/register.
// 3. Se almacenan el token JWT y el email.
// 4. logout elimina el token y el email.
// 5. obtenerPerfil consume GET /api/auth/me.
// 6. Se utiliza localStorage para mantener la sesión al recargar.

import React, {
    createContext,
    useContext,
    useState,
} from "react";

import { API_ENDPOINTS } from "../config/api.js";

// Creamos el contexto.
// Su valor real será entregado por UserProvider.
const UserContext = createContext(null);

// Claves utilizadas para persistir la sesión en localStorage.
const TOKEN_STORAGE_KEY = "mamma_mia_jwt";
const EMAIL_STORAGE_KEY = "mamma_mia_email";

// Hook personalizado para consumir UserContext.
export const useUser = () => {
    const contexto = useContext(UserContext);

    // Validación defensiva para detectar una mala configuración.
    if (!contexto) {
        throw new Error(
            "useUser debe utilizarse dentro de UserProvider."
        );
    }

    return contexto;
};

// Función auxiliar para obtener un mensaje de error entregado por el backend.
const obtenerMensajeError = (data, mensajePredeterminado) => {
    return (
        data?.error ||
        data?.message ||
        data?.mensaje ||
        mensajePredeterminado
    );
};

// Función auxiliar para recuperar el email desde distintas
// estructuras posibles de respuesta.
const obtenerEmailRespuesta = (data, emailFormulario = "") => {
    return (
        data?.email ||
        data?.user?.email ||
        data?.usuario?.email ||
        emailFormulario
    );
};

export const UserProvider = ({ children }) => {
    // Al iniciar la aplicación recuperamos el JWT guardado, si existe.
    const [token, setToken] = useState(() => {
        return localStorage.getItem(TOKEN_STORAGE_KEY) || "";
    });

    // Recuperamos también el email guardado.
    const [email, setEmail] = useState(() => {
        return localStorage.getItem(EMAIL_STORAGE_KEY) || "";
    });

    // Estado general utilizado para informar que una solicitud está en proceso.
    const [cargandoUsuario, setCargandoUsuario] = useState(false);

    // Guarda la sesión tanto en React como en localStorage.
    const guardarSesion = (tokenRecibido, emailRecibido) => {
        setToken(tokenRecibido);
        setEmail(emailRecibido);

        localStorage.setItem(
            TOKEN_STORAGE_KEY,
            tokenRecibido
        );

        localStorage.setItem(
            EMAIL_STORAGE_KEY,
            emailRecibido
        );
    };

    // Limpia completamente la sesión.
    //
    // Este método es utilizado por Navbar, Profile
    // y también cuando el backend rechaza un JWT.
    const logout = () => {
        setToken("");
        setEmail("");

        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(EMAIL_STORAGE_KEY);
    };

    // Función interna compartida por login y register.
    const autenticarUsuario = async (
        endpoint,
        emailFormulario,
        password
    ) => {
        setCargandoUsuario(true);

        try {
            const respuesta = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailFormulario,
                    password,
                }),
            });

            // Intentamos convertir la respuesta a JSON.
            // Si el backend no entrega contenido JSON,
            // utilizamos un objeto vacío.
            const data = await respuesta
                .json()
                .catch(() => ({}));

            if (!respuesta.ok) {
                throw new Error(
                    obtenerMensajeError(
                        data,
                        "No fue posible autenticar al usuario."
                    )
                );
            }

            // El backend debe entregar un token JWT.
            // También aceptamos nombres alternativos por seguridad.
            const tokenRecibido =
                data.token ||
                data.jwt ||
                data.accessToken;

            if (!tokenRecibido) {
                throw new Error(
                    "El backend no devolvió un token JWT."
                );
            }

            // El email normalmente viene en la respuesta.
            // Como respaldo usamos el email enviado en el formulario.
            const emailRecibido = obtenerEmailRespuesta(
                data,
                emailFormulario
            );

            // Guardamos token y email en sus respectivos estados.
            guardarSesion(
                tokenRecibido,
                emailRecibido
            );

            return data;
        } finally {
            setCargandoUsuario(false);
        }
    };

    // Login real contra el backend.
    const login = async (emailFormulario, password) => {
        return autenticarUsuario(
            API_ENDPOINTS.login,
            emailFormulario,
            password
        );
    };

    // Registro real contra el backend.
    const register = async (emailFormulario, password) => {
        return autenticarUsuario(
            API_ENDPOINTS.register,
            emailFormulario,
            password
        );
    };

    // Obtiene el perfil del usuario autenticado.
    //
    // El JWT se envía en el encabezado Authorization.
    const obtenerPerfil = async () => {
        if (!token) {
            throw new Error(
                "No existe una sesión activa."
            );
        }

        setCargandoUsuario(true);

        try {
            const respuesta = await fetch(
                API_ENDPOINTS.profile,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await respuesta
                .json()
                .catch(() => ({}));

            // Si el token fue rechazado, cerramos la sesión local.
            if (respuesta.status === 401) {
                logout();

                throw new Error(
                    "La sesión expiró. Debes iniciar sesión nuevamente."
                );
            }

            if (!respuesta.ok) {
                throw new Error(
                    obtenerMensajeError(
                        data,
                        "No fue posible obtener el perfil."
                    )
                );
            }

            // Actualizamos el email con la información real del perfil.
            const emailPerfil = obtenerEmailRespuesta(
                data,
                email
            );

            setEmail(emailPerfil);

            localStorage.setItem(
                EMAIL_STORAGE_KEY,
                emailPerfil
            );

            return data;
        } finally {
            setCargandoUsuario(false);
        }
    };

    // Valores disponibles para toda la aplicación.
    const valorContexto = {
        token,
        email,
        cargandoUsuario,
        login,
        register,
        logout,
        obtenerPerfil,
    };

    return (
        <UserContext.Provider value={valorContexto}>
            {children}
        </UserContext.Provider>
    );
};