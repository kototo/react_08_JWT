// Función reutilizable para formatear precios en pesos chilenos.
// Ejemplo: 25000 => 25.000

export const formatoMoneda = (value) => {
  return value.toLocaleString('es-CL');
};
