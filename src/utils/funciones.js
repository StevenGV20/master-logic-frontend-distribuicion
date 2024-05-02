export const calcularVolumenTotal = (ordenes) => {
  let totalVolumen = 0;
  for (let index = 0; index < ordenes.length; index++) {
    totalVolumen += ordenes[index].volumen;
  }
  return totalVolumen;
};

export const calcularMontoTotal = (ordenes) => {
  let totalMonto = 0;
  for (let index = 0; index < ordenes.length; index++) {
    totalMonto += ordenes[index].monto;
  }
  return totalMonto.toFixed(2);
};

export const calcularPesoTotal = (ordenes) => {
  let totalPeso = 0;
  for (let index = 0; index < ordenes.length; index++) {
    totalPeso += ordenes[index].peso;
  }
  return totalPeso.toFixed(2);
};

export const calcularBultosTotal = (ordenes) => {
  let totalPeso = 0;
  for (let index = 0; index < ordenes.length; index++) {
    totalPeso += ordenes[index].bultos;
  }
  return totalPeso;
};

export const calcularVolumenAsignadoTotal = (grupos) => {
  let totalVolumen = 0;
  for (let index = 0; index < grupos.length; index++) {
    totalVolumen += grupos[index].volumenTotal;
  }
  return totalVolumen;
};
