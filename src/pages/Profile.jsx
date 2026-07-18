// Profile.jsx
// Página privada del usuario.
//
// La ruta está protegida desde App.jsx.
// El botón utiliza el mismo logout disponible en Navbar.

import React from "react";

import { useUser } from "../context/UserContext.jsx";

const Profile = () => {
    // Email estático conservado desde el Hito 5.
    const emailUsuario = "prueba@prueba.com";

    // Método global de cierre de sesión.
    const { logout } = useUser();

    return (
        <main className="form-page">
            <section className="card form-card p-4">
                <h1 className="form-title">
                    Perfil de usuario
                </h1>

                <p>
                    <strong>Email:</strong> {emailUsuario}
                </p>

                {/*
                    Al cambiar token a false, ProtectedRoute detectará
                    el cambio y redirigirá automáticamente a /login.
                */}
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