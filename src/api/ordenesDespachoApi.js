import  {URL_MASTERLOGIC_API} from '../utils/general';

const fetchOrdenesDespacho = async()=> {
  try {
    const response = await fetch(
      `${URL_MASTERLOGIC_API}/db.json`
    );
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    const data = await response.json();
    console.log(data);
    return data.ordenesDespacho;
  } catch (error) {
    console.error(error);
  }
}

async function fetchOrdenesDespachoOsis(filtros) {
    try {
      const response = await fetch(
        `${URL_MASTERLOGIC_API}/db.json`
      );
      if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
      }
      const data = await response.json();
      console.log(data);
      return data.ordenesDespachoOsis;
    } catch (error) {
      console.error(error);
    }
  }

export { fetchOrdenesDespacho,fetchOrdenesDespachoOsis };
