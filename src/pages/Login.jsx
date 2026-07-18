// Login.jsx
// Página de inicio de sesión.
//
// En el Hito 8 ya no se comparan credenciales localmente.
// El formulario consume el método login de UserContext,
// que realiza una petición real al backend.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext.jsx";

const Login = () => {
    // Estados controlados del formulario.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Mensaje de error que puede venir desde validaciones
    // locales o desde el backend.
    const [error, setError] = useState("");

    // Método real de autenticación y estado de carga.
    const {
        login,
        cargandoUsuario,
    } = useUser();

    // Permite redirigir al Home cuando el login es correcto.
    const navigate = useNavigate();

    const manejarSubmit = async (evento) => {
        evento.preventDefault();

        // Limpiamos errores anteriores.
        setError("");

        // Validación de campos obligatorios.
        if (
            email.trim() === "" ||
            password.trim() === ""
        ) {
            setError(
                "Todos los campos son obligatorios."
            );

            return;
        }

        // Validación mínima solicitada desde hitos anteriores.
        if (password.length < 6) {
            setError(
                "La contraseña debe tener al menos 6 caracteres."
            );

            return;
        }

        try {
            // El método login consume POST /api/auth/login.
            await login(email, password);

            // Cuando UserContext guarda el JWT,
            // redirigimos al Home.
            navigate("/", {
                replace: true,
            });
        } catch (errorLogin) {
            setError(
                errorLogin.message ||
                "No fue posible iniciar sesión."
            );
        }
    };

    return (
        <main className="form-page">
            <section className="card form-card p-4">
                <h1 className="form-title">
                    Iniciar sesión
                </h1>

                <form onSubmit={manejarSubmit}>
                    <div className="mb-3">
                        <label
                            htmlFor="login-email"
                            className="form-label"
                        >
                            Email
                        </label>

                        <input
                            id="login-email"
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(evento) =>
                                setEmail(evento.target.value)
                            }
                            placeholder="test@test.com"
                            autoComplete="email"
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="login-password"
                            className="form-label"
                        >
                            Contraseña
                        </label>

                        <input
                            id="login-password"
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(evento) =>
                                setPassword(evento.target.value)
                            }
                            placeholder="123123"
                            autoComplete="current-password"
                        />
                    </div>

                    {error !== "" && (
                        <div
                            className="alert alert-danger"
                            role="alert"
                        >
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-dark"
                        disabled={cargandoUsuario}
                    >
                        {cargandoUsuario
                            ? "Ingresando..."
                            : "Iniciar sesión"}
                    </button>
                </form>
            </section>
        </main>
    );
};

export default Login;