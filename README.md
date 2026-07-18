# Hito 7 - Pizzería Mamma Mía

Proyecto desarrollado con React y Vite para el desafío de aprendizaje **Pizzería Mamma Mía**.

En este hito se profundiza el uso de **React Router**, incorporando rutas dinámicas con `useParams`, autenticación simulada mediante `UserContext`, navegación condicional y protección de rutas.

El proyecto conserva las funcionalidades desarrolladas en los hitos anteriores:

- Consumo de la API de pizzas.
- Carrito global mediante Context API.
- Persistencia del carrito con `localStorage`.
- Carrito flotante.
- React Router.
- Formularios de Login y Register.

## Ver online

La aplicación está publicada en:

[https://desafiolatam.sinapsolabs.cl/react_07_React_Router_II/](https://desafiolatam.sinapsolabs.cl/react_07_React_Router_II/)

## Objetivo del Hito 7

El objetivo principal es implementar funcionalidades avanzadas de React Router y autenticación simulada.

Se incorporan:

- Rutas dinámicas para mostrar pizzas según su identificador.
- Uso de `useParams`.
- Context global para almacenar el token del usuario.
- Inicio y cierre de sesión simulados.
- Navegación condicional en el Navbar.
- Desactivación del botón Pagar cuando no existe sesión.
- Protección de la ruta `/profile`.
- Restricción de Login y Register cuando el usuario ya está autenticado.

## Backend utilizado

La aplicación consume la API implementada en el Hito 4:

```text
https://desafiolatam.sinapsolabs.cl/react_04_backend/api/
```

Listado completo de pizzas:
```text
https://desafiolatam.sinapsolabs.cl/react_04_backend/api/pizzas
```
Detalle dinámico de una pizza:
```text
https://desafiolatam.sinapsolabs.cl/react_04_backend/api/pizzas/:id
```

