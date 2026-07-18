// Register.jsx
// Página de registro.
//
// En el Hito 8 el formulario consume el método register
// de UserContext, que realiza POST /api/auth/register.
//
// Si el backend registra correctamente al usuario,
// devuelve un JWT y el usuario queda autenticado.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext.jsx";

const Register = () => {
    // Estados del formulario.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] =
        useState("");

    const [error, setError] = useState("");

    // Método real de registro.
    const {
        register,
        cargandoUsuario,
    } = useUser();

    const navigate = useNavigate();

    const manejarSubmit = async (evento) => {
        evento.preventDefault();

        setError("");

        // Todos los campos son obligatorios.
        if (
            email.trim() === "" ||
            password.trim() === "" ||
            confirmarPassword.trim() === ""
        ) {
            setError(
                "Todos los campos son obligatorios."
            );

            return;
        }

        // Validamos la extensión mínima.
        if (password.length < 6) {
            setError(
                "La contraseña debe tener al menos 6 caracteres."
            );

            return;
        }

        // Ambas contraseñas deben ser iguales.
        if (password !== confirmarPassword) {
            setError(
                "Las contraseñas no coinciden."
            );

            return;
        }

        try {
            // Consume POST /api/auth/register.
            await register(email, password);

            // El registro también inicia la sesión
            // porque UserContext almacena el JWT recibido.
            navigate("/", {
                replace: true,
            });
        } catch (errorRegister) {
            setError(
                errorRegister.message ||
                "No fue posible registrar al usuario."
            );
        }
    };

    return (
        <main className="form-page">
            <section className="card form-card p-4">
                <h1 className="form-title">
                    Crear cuenta
                </h1>

                <form onSubmit={manejarSubmit}>
                    <div className="mb-3">
                        <label
                            htmlFor="register-email"
                            className="form-label"
                        >
                            Email
                        </label>

                        <input
                            id="register-email"
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(evento) =>
                                setEmail(evento.target.value)
                            }
                            placeholder="usuario@correo.com"
                            autoComplete="email"
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="register-password"
                            className="form-label"
                        >
                            Contraseña
                        </label>

                        <input
                            id="register-password"
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(evento) =>
                                setPassword(evento.target.value)
                            }
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="register-confirm-password"
                            className="form-label"
                        >
                            Confirmar contraseña
                        </label>

                        <input
                            id="register-confirm-password"
                            type="password"
                            className="form-control"
                            value={confirmarPassword}
                            onChange={(evento) =>
                                setConfirmarPassword(
                                    evento.target.value
                                )
                            }
                            autoComplete="new-password"
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
                            ? "Registrando..."
                            : "Registrarse"}
                    </button>
                </form>
            </section>
        </main>
    );
};

export default Register;