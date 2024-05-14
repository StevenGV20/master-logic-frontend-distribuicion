const URL_FAKE_API =
  "https://raw.githubusercontent.com/StevenGV20/fakeapi-testing/main";

const URL_MASTERLOGIC_API = "http://192.168.25.42:5006";
const API_MAESTRO = "/api/Maestro";
const API_DISTRIBUCION = "/api/Distribucion";
const COD_CIA = "01";
const USERNAME_LOCAL = localStorage.getItem("USERNAME");


const ORDENES_DESPACHO_TABLE_COLS_DESKTOP = [
  "Item",
  "Pedido",
  "Ord. Despacho",
  "Canal",
  "Cliente",
  "Carga",
  "GRUPO",
];

const GRUPOS_COLS_MODAL_DESKTOP = [
  "GRUPO",
  "SEDE",
  "VOLUMEN TOTAL",
  "MONTO TOTAL",
];
const GRUPOS_COLS_MODAL_MOBILE = ["GRUPO", ""];

const GRUPOS_COLS_DESKTOP = [
  "GRUPO",
  "SEDE",
  "VOLUMEN (m3)",
  "MONTO TOTAL",
  "UBIGEO",
  "VEHÍCULO",
  "RUTA",
  "MONTO",
  "",
];

const GRUPOS_COLS_MOBILE = ["GRUPO", " ", "VEHÍCULO", ""];
const VEHICULOS_DISPONIBILIDAD_COLS_DESKTOP = [
  "VEHÍCULO",
  "CHOFER",
  "SEDE",
  "VOLUMEN MAXIMO (m3)",
  "VOLUMEN ACTUAL ASIGNADO (m3)",
  "VOLUMEN DISPONIBLE (m3)",
  "",
];

const VEHICULOS_DISPONIBILIDAD_COLS_MOBILE = ["VEHÍCULO", ""];

const MANTENIMIENTO_UNIDAD_TRANSPORTE_TABLE_COLS_DESKTOP = [
  "ID",
  "CODIGO",
  "VEHICULO",
  "CHOFER",
  "utr_conrep",
  "",
];

const MANTENIMIENTO_UNIDAD_TRANSPORTE_TABLE_COLS_MOBILE =[
  "UNIDAD DE TRANSPORTE",
  ""
]
const MANTENIMIENTO_RUTAS_TABLE_COLS_DESKTOP = [
  "CODIGO",
  "SEDE",
  "DESCRIPCION",
  "VOLUMEN MINIMO",
  "VOLUMEN MAXIMO",
  "PRECIO",
  "DISTRITOS",
  "",
];
const MANTENIMIENTO_RUTAS_TABLE_COLS_MOBILE = ["RUTA", ""];

const MANTENIMIENTO_RUTAS_DISTRITOS_TABLE_COLS_DESKTOP = [
  "UBIGEO",
  "DISTRITO",
  "",
];
const MANTENIMIENTO_DISTANCIAS_TABLE_COLS_DESKTOP = [
  "SEDE",
  "DISTRITO",
  "KM",
  "",
];

const MANTENIMIENTO_CHOFERES_TABLE_COLS_DESKTOP = [
  "CODIGO",
  "NOMBRE",
  "NRO. LICENCIA",
  "COD. USUARIO",
  "COD. EMPLEADO",
  "NRO. DOCUMENTO",
  "",
];

const MANTENIMIENTO_CHOFERES_TABLE_COLS_MOBILE = ["CHOFER", ""];

const PEN_CURRENCY = "S/.";
const USD_CURRENCY = "$";
export {
  URL_FAKE_API,
  PEN_CURRENCY,
  ORDENES_DESPACHO_TABLE_COLS_DESKTOP,
  GRUPOS_COLS_MODAL_DESKTOP,
  GRUPOS_COLS_MODAL_MOBILE,
  GRUPOS_COLS_DESKTOP,
  GRUPOS_COLS_MOBILE,
  VEHICULOS_DISPONIBILIDAD_COLS_DESKTOP,
  VEHICULOS_DISPONIBILIDAD_COLS_MOBILE,
  MANTENIMIENTO_UNIDAD_TRANSPORTE_TABLE_COLS_DESKTOP,
  MANTENIMIENTO_UNIDAD_TRANSPORTE_TABLE_COLS_MOBILE,
  MANTENIMIENTO_RUTAS_TABLE_COLS_DESKTOP,
  MANTENIMIENTO_RUTAS_TABLE_COLS_MOBILE,
  MANTENIMIENTO_RUTAS_DISTRITOS_TABLE_COLS_DESKTOP,
  MANTENIMIENTO_DISTANCIAS_TABLE_COLS_DESKTOP,
  MANTENIMIENTO_CHOFERES_TABLE_COLS_DESKTOP,
  MANTENIMIENTO_CHOFERES_TABLE_COLS_MOBILE,
  URL_MASTERLOGIC_API,
  API_MAESTRO,
  API_DISTRIBUCION,
  COD_CIA,
  USERNAME_LOCAL,
};
