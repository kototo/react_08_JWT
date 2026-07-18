# Hito 8 - Pizzería Mamma Mía

Proyecto final desarrollado con React y Vite para el desafío de aprendizaje **Pizzería Mamma Mía**.

En este hito se implementa autenticación real mediante **JSON Web Token — JWT**, consumiendo los endpoints del backend para iniciar sesión, registrar usuarios, consultar el perfil autenticado y realizar una compra simulada.

El proyecto mantiene las funcionalidades desarrolladas en los hitos anteriores:

- Consumo de API de pizzas.
- React Router.
- Rutas dinámicas mediante `useParams`.
- Rutas públicas y protegidas.
- Carrito global mediante Context API.
- Persistencia del carrito con `localStorage`.
- Carrito flotante.
- Navegación condicional en el Navbar.

## Ver online

La aplicación está publicada en:

[https://desafiolatam.sinapsolabs.cl/react_08_JWT/](https://desafiolatam.sinapsolabs.cl/react_08_JWT/)


## Objetivo 

El objetivo principal es reemplazar la autenticación simulada del Hito 7 por autenticación real contra el backend utilizando JWT.

Se implementan las siguientes funcionalidades:

- Login real contra la API.
- Registro real de usuarios.
- Almacenamiento de token JWT y email.
- Persistencia de sesión mediante `localStorage`.
- Consulta del perfil autenticado.
- Logout desde Navbar y Profile.
- Protección de rutas mediante JWT.
- Checkout autenticado.
- Mensaje de compra realizada correctamente.

## Backend utilizado

La aplicación consume la API publicada en:

```text
https://desafiolatam.sinapsolabs.cl/react_04_backend/api
```

Usuario de prueba

Para probar el inicio de sesión:
```text
Email: test@test.com
Contraseña: 123123
```