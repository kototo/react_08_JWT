// Register.jsx
// Componente solicitado en el Hito 2.
// Maneja estado y eventos para validar un formulario de registro.

// Importamos React y useState para manejar el estado del formulario.
import React, { useState } from "react";

const Register = () => {
    // Estados del formulario.
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");

    // Estados para mostrar mensaje de éxito o error.
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("");

    // Función que se ejecuta al enviar el formulario.
    const manejarEnvio = (evento) => {
        // Evita que la página se recargue.
        evento.preventDefault();

        // Validación: campos obligatorios.
        if (
            email.trim() === "" ||
            contrasena.trim() === "" ||
            confirmarContrasena.trim() === ""
        ) {
            setMensaje("Todos los campos son obligatorios.");
            setTipoMensaje("danger");
            return;
        }

        // Validación: contraseña mínima de 6 caracteres.
        if (contrasena.length < 6) {
            setMensaje("La contraseña debe tener al menos 6 caracteres.");
            setTipoMensaje("danger");
            return;
        }

        // Validación: contraseña y confirmación deben ser iguales.
        if (contrasena !== confirmarContrasena) {
            setMensaje("La contraseña y la confirmación no coinciden.");
            setTipoMensaje("danger");
            return;
        }

        // Mensaje de éxito. No se guarda información todavía.
        setMensaje("Registro exitoso.");
        setTipoMensaje("success");
    };

    return (
        <main className="form-page">
            <section className="form-card">
                <h1 className="form-title">Register</h1>

                <form onSubmit={manejarEnvio}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Ingresa tu email"
                            value={email}
                            onChange={(evento) => setEmail(evento.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Ingresa tu contraseña"
                            value={contrasena}
                            onChange={(evento) => setContrasena(evento.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Confirmar contraseña</label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirma tu contraseña"
                            value={confirmarContrasena}
                            onChange={(evento) => setConfirmarContrasena(evento.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </form>

                {mensaje !== "" && (
                    <div className={`alert alert-${tipoMensaje} mt-3`} role="alert">
                        {mensaje}
                    </div>
                )}
            </section>
        </main>
    );
};

export default Register;