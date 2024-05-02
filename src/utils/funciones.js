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

export const buscarCadena = (objeto, cadena) => {
  for (let clave in objeto) {
    if (typeof objeto[clave] === "object") {
      if (buscarCadena(objeto[clave], cadena)) {
        return true;
      }
    } else if (
      typeof objeto[clave] === "string" &&
      objeto[clave].includes(cadena)
    ) {
      return true;
    }
  }
  return false;
};

export const convertirDateToTimeString = (fechaHoraString) => {
  const fechaHora = new Date(fechaHoraString);

  // Obtenemos la hora y los minutos
  const horas = fechaHora.getHours();
  const minutos = fechaHora.getMinutes();

  // Formateamos la hora en un string
  const horaString = `${horas < 10 ? "0" : ""}${horas}:${
    minutos < 10 ? "0" : ""
  }${minutos}`;

  return horaString;
};

export const convertirTimeStringToDate = (horaString) => {
  // Obtenemos las horas y los minutos desde la cadena
  const [horasStr, minutosStr] = horaString.split(":");
  const horas = parseInt(horasStr, 10);
  const minutos = parseInt(minutosStr, 10);

  // Creamos un objeto de fecha y hora con la fecha actual y la hora de la cadena
  const fechaHora = new Date();
  fechaHora.setHours(horas);
  fechaHora.setMinutes(minutos);

  return fechaHora;
};
