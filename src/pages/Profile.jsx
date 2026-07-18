// Profile.jsx
// Página privada del usuario.
//
// Al montar el componente consulta GET /api/auth/me
// enviando el JWT en Authorization.
//
// Muestra el email real almacenado en UserContext
// y permite cerrar la sesión.

import React, { useEffect, useState } from "react";

import { useUser } from "../context/UserContext.jsx";

const Profile = () => {
    const {
        email,
        obtenerPerfil,
        logout,
        cargandoUsuario,
    } = useUser();

    const [error, setError] = useState("");

    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                setError("");

                // Consume GET /api/auth/me.
                await obtenerPerfil();
            } catch (errorPerfil) {
                setError(
                    errorPerfil.message ||
                    "No fue posible cargar el perfil."
                );
            }
        };

        cargarPerfil();

        // La carga se realiza una vez al montar Profile.
    }, []);

    return (
        <main className="form-page">
            <section className="card form-card p-4">
                <h1 className="form-title">
                    Perfil de usuario
                </h1>

                {cargandoUsuario && (
                    <p>Cargando perfil...</p>
                )}

                {error !== "" && (
                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
                        {error}
                    </div>
                )}

                {email !== "" && (
                    <p>
                        <strong>Email:</strong>{" "}
                        {email}
                    </p>
                )}

                <button
                    type="button"
                    className="btn btn-dark"
                    onClick={logout}
                >
                    Cerrar sesión
                </button>
            </section>
        </main>
    );
};

export default Profile;