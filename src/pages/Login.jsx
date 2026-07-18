// Login.jsx
// Página de inicio de sesión.
//
// Valida credenciales simuladas y, cuando son correctas,
// ejecuta el método login del UserContext.


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Context global del usuario.
import { useUser } from "../context/UserContext.jsx";

const Login = () => {
    // Credenciales simuladas utilizadas para este ejercicio.
    const usuarioPrueba = "prueba@prueba.com";
    const contraseñaPrueba = "prueba1234";

    // Estados controlados del formulario.
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");

    // Mensajes de validación.
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    // Método global para cambiar token a true.
    const { login } = useUser();

    // Permite navegar al Home después del login.
    const navigate = useNavigate();

    // Procesa el formulario.
    const manejarSubmit = (evento) => {
        // Evita que el formulario recargue el navegador.
        evento.preventDefault();

        // Limpiamos los mensajes anteriores.
        setError("");
        setMensaje("");

        // Validación de campos obligatorios.
        if (email.trim() === "" || contraseña.trim() === "") {
            setError("Todos los campos son obligatorios.");
            return;
        }

        // Validación de extensión mínima.
        if (contraseña.length < 6) {
            setError(
                "La contraseña debe tener al menos 6 caracteres."
            );
            return;
        }

        // Validación de credenciales simuladas.
        if (
            email !== usuarioPrueba ||
            contraseña !== contraseñaPrueba
        ) {
            setError("Email o contraseña incorrectos.");
            return;
        }

        // Cambia el token global a true.
        // Esto actualiza inmediatamente el Navbar.
        login();

        // Mensaje de confirmación.
        setMensaje("Inicio de sesión correcto.");

        // Redirige al Home.
        navigate("/");
    };

    return (
        <main className="form-page">
            <section className="card form-card p-4">
                <h1 className="form-title">
                    Iniciar sesión
                </h1>

                <form onSubmit={manejarSubmit}>
                    {/* Campo email */}
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
                            placeholder="prueba@prueba.com"
                        />
                    </div>

                    {/* Campo contraseña */}
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
                            value={contraseña}
                            onChange={(evento) =>
                                setContraseña(evento.target.value)
                            }
                            placeholder="prueba1234"
                        />
                    </div>

                    {/* Mensaje de error */}
                    {error !== "" && (
                        <div
                            className="alert alert-danger"
                            role="alert"
                        >
                            {error}
                        </div>
                    )}

                    {/* Mensaje de éxito */}
                    {mensaje !== "" && (
                        <div
                            className="alert alert-success"
                            role="alert"
                        >
                            {mensaje}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-dark"
                    >
                        Iniciar sesión
                    </button>
                </form>
            </section>
        </main>
    );
};

export default Login;