import App from "../App";
import {
  Agrupamiento,
  AsignVehiculo,
  GuiaRemitente,
  GuiaTransporte,
} from "../icons/icons-svg";
import AgruparODPage from "../pages/AgruparODPage";
import AsignarVehiculoPage from "../pages/AsignarVehiculoPage";
import GenerarGRR from "../pages/GenerarGRR";
import GenerarOTyGRT from "../pages/GenerarOTyGRT";
import MantenimientoVehiculosPage from "../pages/MantenimientoVehiculosPage";
import MantenimientoRutasPage from "../pages/MantenimientoRutasPage";
import MantenimientoDistanciasPage from "../pages/MantenimientoDistanciasPage";
import MantenimientoDistritosRutasPage from "../pages/MantenimientoDistritosRutasPage";
import {
  PAGE_GENERAR_GRR,
  PAGE_AGRUPAR_OD,
  PAGE_ASIGNAR_VEHICULO,
  PAGE_GENERAR_OT_Y_GRT,
  PAGE_MANTENIMIENTO_RUTAS,
  PAGE_MANTENIMIENTO_VEHICULOS,
  PAGE_MANTENIMIENTO_DISTRITOS_RUTAS,
  PAGE_MANTENIMIENTO_DISTANCIAS,
} from "./titles";

const routesPages = [
  {
    path: "/",
    name: "DISTRIBUICION",
    icon: "",
    element: <App />,
  },
  {
    path: "/agrupar-orden-despacho",
    name: PAGE_AGRUPAR_OD,
    icon: <Agrupamiento />,
    element: <AgruparODPage />,
  },
  {
    path: "/asignar-vehiculo",
    name: PAGE_ASIGNAR_VEHICULO,
    icon: <AsignVehiculo />,
    element: <AsignarVehiculoPage />,
  },
  {
    path: "/generar-grr",
    name: PAGE_GENERAR_GRR,
    icon: <GuiaRemitente />,
    element: <GenerarGRR />,
  },
  {
    path: "/generar-ot-grt",
    name: PAGE_GENERAR_OT_Y_GRT,
    icon: <GuiaTransporte />,
    element: <GenerarOTyGRT />,
  },
  {
    path: "/mantenimiento/vehiculos",
    name: PAGE_MANTENIMIENTO_VEHICULOS,
    icon: <></>,
    element: <MantenimientoVehiculosPage />,
  },
  {
    path: "/mantenimiento/rutas",
    name: PAGE_MANTENIMIENTO_RUTAS,
    icon: <></>,
    element: <MantenimientoRutasPage />,
  },
  {
    path: "/mantenimiento/distritos-rutas",
    name: PAGE_MANTENIMIENTO_DISTRITOS_RUTAS,
    icon: <></>,
    element: <MantenimientoDistritosRutasPage/>,
  },
  {
    path: "/mantenimiento/distancias",
    name: PAGE_MANTENIMIENTO_DISTANCIAS,
    icon: <></>,
    element: <MantenimientoDistanciasPage/>,
  },
];

export { routesPages };
