// Header.jsx muestra la imagen de fondo, el título y la descripción.
// Este componente se llama desde Home.jsx.

// Importamos React para que JSX pueda ser interpretado correctamente.
import React from "react";

const Header = () => {
  return (
    <header className="hero-header">
      <div className="hero-content">
        <h1>¡Pizzería Mamma Mía!</h1>
        <p>¡Tenemos las mejores pizzas que podrás encontrar!</p>
      </div>
    </header>
  );
};

export default Header;
