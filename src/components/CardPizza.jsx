// CardPizza.jsx
// Componente reutilizable para mostrar una pizza.
//
// En el Hito 7:
// 1. Recibe el id de la pizza.
// 2. El botón "Ver más" utiliza Link.
// 3. La URL se construye dinámicamente como /pizza/:id.
// 4. El botón Añadir conserva Cart Context mediante onAgregar.

import React from "react";
import { Link } from "react-router-dom";

import { formatoMoneda } from "../utils/formatoMoneda.js";

const CardPizza = ({
                     id,
                     name,
                     price,
                     ingredients,
                     img,
                     onAgregar,
                   }) => {
  return (
      <article className="card pizza-card">
        <img
            src={img}
            className="card-img-top pizza-img"
            alt={`Pizza ${name}`}
        />

        <div className="card-body pizza-card-body">
          <h2 className="pizza-title">
            Pizza {name}
          </h2>

          <hr />

          <div className="ingredients-box">
            <p className="ingredients-title">
              Ingredientes:
            </p>

            <ul className="ingredients-list">
              {ingredients.map((ingrediente, index) => (
                  <li key={index}>
                    <i className="fa-solid fa-pizza-slice me-1"></i>
                    {ingrediente}
                  </li>
              ))}
            </ul>
          </div>

          <hr />

          <p className="pizza-price">
            Precio: ${formatoMoneda(price)}
          </p>

          <div className="pizza-buttons">
            {/*
                        Link construye la ruta con el id real de la pizza.
                        Ejemplo: /pizza/p001 o /pizza/p004.
                    */}
            <Link
                className="btn btn-outline-dark btn-sm"
                to={`/pizza/${id}`}
            >
              Ver más
            </Link>

            {/* Agrega la pizza al carrito global */}
            <button
                className="btn btn-dark btn-sm"
                type="button"
                onClick={onAgregar}
            >
              Añadir
              <i className="fa-solid fa-cart-shopping ms-1"></i>
            </button>
          </div>
        </div>
      </article>
  );
};

export default CardPizza;