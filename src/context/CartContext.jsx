// CartContext.jsx
// Context global del carrito.
// El estado React es la fuente principal de información.
// localStorage se utiliza solamente para persistir el carrito entre recargas.

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

// Creamos el Context.
const CartContext = createContext(null);

// Nombre utilizado para almacenar el carrito en localStorage.
const CART_STORAGE_KEY = "mamma_mia_cart";

// Recupera el carrito guardado al iniciar la aplicación.
const obtenerCarritoInicial = () => {
    try {
        const carritoGuardado = localStorage.getItem(CART_STORAGE_KEY);

        if (!carritoGuardado) {
            return [];
        }

        const carritoConvertido = JSON.parse(carritoGuardado);

        // Validación para garantizar que el contenido guardado sea un array.
        return Array.isArray(carritoConvertido)
            ? carritoConvertido
            : [];
    } catch (error) {
        console.error(
            "No se pudo recuperar el carrito desde localStorage:",
            error
        );

        return [];
    }
};

// Hook personalizado para consumir el carrito.
export const useCart = () => {
    const contexto = useContext(CartContext);

    if (!contexto) {
        throw new Error(
            "useCart debe utilizarse dentro de CartProvider."
        );
    }

    return contexto;
};

// Provider global.
export const CartProvider = ({ children }) => {
    // Único estado global del carrito.
    const [carrito, setCarrito] = useState(obtenerCarritoInicial);

    // Cada vez que cambia el carrito, se guarda en localStorage.
    // localStorage no controla la interfaz; solamente conserva la información.
    useEffect(() => {
        localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(carrito)
        );
    }, [carrito]);

    // Agrega una pizza.
    // Si ya está en el carrito, aumenta su cantidad.
    const agregarAlCarrito = (pizza) => {
        setCarrito((carritoActual) => {
            const productoExistente = carritoActual.find(
                (producto) => producto.id === pizza.id
            );

            if (productoExistente) {
                return carritoActual.map((producto) =>
                    producto.id === pizza.id
                        ? {
                            ...producto,
                            count: producto.count + 1,
                        }
                        : producto
                );
            }

            return [
                ...carritoActual,
                {
                    id: pizza.id,
                    name: pizza.name,
                    price: pizza.price,
                    img: pizza.img,
                    count: 1,
                },
            ];
        });
    };

    // Aumenta una unidad.
    const aumentarCantidad = (id) => {
        setCarrito((carritoActual) =>
            carritoActual.map((producto) =>
                producto.id === id
                    ? {
                        ...producto,
                        count: producto.count + 1,
                    }
                    : producto
            )
        );
    };

    // Disminuye una unidad.
    // Cuando la cantidad llega a cero, elimina el producto.
    const disminuirCantidad = (id) => {
        setCarrito((carritoActual) =>
            carritoActual
                .map((producto) =>
                    producto.id === id
                        ? {
                            ...producto,
                            count: producto.count - 1,
                        }
                        : producto
                )
                .filter((producto) => producto.count > 0)
        );
    };

    // Elimina completamente un producto.
    const eliminarDelCarrito = (id) => {
        setCarrito((carritoActual) =>
            carritoActual.filter(
                (producto) => producto.id !== id
            )
        );
    };

    // Vacía todo el carrito.
    const limpiarCarrito = () => {
        setCarrito([]);
    };

    // El total se deriva directamente del estado actual del carrito.
    // Al cambiar carrito, React vuelve a calcularlo y Navbar se renderiza.
    const totalCarrito = carrito.reduce(
        (acumulador, producto) =>
            acumulador + producto.price * producto.count,
        0
    );

    // Cantidad total de unidades agregadas.
    const cantidadProductos = carrito.reduce(
        (acumulador, producto) =>
            acumulador + producto.count,
        0
    );

    const valorContexto = {
        carrito,
        totalCarrito,
        cantidadProductos,
        agregarAlCarrito,
        aumentarCantidad,
        disminuirCantidad,
        eliminarDelCarrito,
        limpiarCarrito,
    };

    return (
        <CartContext.Provider value={valorContexto}>
            {children}
        </CartContext.Provider>
    );
};