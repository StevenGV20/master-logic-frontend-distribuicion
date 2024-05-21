import { URL_MASTERLOGIC_API } from "./general";

export const calcularVolumenTotal = (ordenes) => {
  let totalVolumen = 0;
  for (let index = 0; index < ordenes.length; index++) {
    totalVolumen += ordenes[index].odc_volumen;
  }
  return totalVolumen;
};

export const calcularMontoTotal = (ordenes) => {
  let totalMonto = 0;
  for (let index = 0; index < ordenes.length; index++) {
    totalMonto += ordenes[index].odc_imptot;
  }
  return totalMonto.toFixed(2);
};

export const calcularPesoTotal = (ordenes) => {
  let totalPeso = 0;
  for (let index = 0; index < ordenes.length; index++) {
    totalPeso += ordenes[index].odc_peso;
  }
  return totalPeso.toFixed(2);
};

export const calcularBultosTotal = (ordenes) => {
  let totalPeso = 0;
  for (let index = 0; index < ordenes.length; index++) {
    totalPeso += ordenes[index].odc_bultos;
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

export const convertirDateTimeToDate = (dia) => {
  // Fecha en formato 'YYYY-MM-DD HH:mm:ss.SSS'
  var fecha = new Date(dia);

  // Obtener partes de la fecha
  var year = fecha.getFullYear().toString();
  var month = (fecha.getMonth() + 1).toString().padStart(2, "0"); // El mes está basado en cero, por lo que sumamos 1
  var day = fecha.getDate().toString().padStart(2, "0");

  // Concatenar partes de la fecha en formato 'YYYYMMDD'
  var fechaFormateada = year +"-"+ month +"-"+ day;

  return fechaFormateada; // Salida: '20071009'
};

export const redondearDecimales = (numero) => {
  return Math.round(numero * 100) / 100;
}

export const getFetchFunction = async (path, setLoadingTable, setData) => {
  try {
    const token = localStorage.getItem("USUARIO_TOKEN");
    const response = await fetch(`${URL_MASTERLOGIC_API}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    const data = await response.json();
    setLoadingTable(false);
    setData(data);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const postFetchFunction = async (path, values, setOpenMessage) => {
  try {
    const token = localStorage.getItem("USUARIO_TOKEN");
    const response = await fetch(`${URL_MASTERLOGIC_API}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values, null, 2),
    });
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    const data = await response.json();
    setOpenMessage({
      state: true,
      message: data.mensaje,
      type: data.status.toLowerCase(),
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteFetchFunction = async (path, values, setOpenMessage) => {
  try {
    const token = localStorage.getItem("USUARIO_TOKEN");
    const response = await fetch(`${URL_MASTERLOGIC_API}${path}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values, null, 2),
    });
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    const data = await response.json();
    console.log(data);
    setOpenMessage({
      state: true,
      message: data.mensaje,
      type: data.status.toLowerCase(),
    });
  } catch (error) {
    console.error(error);
  }
};
