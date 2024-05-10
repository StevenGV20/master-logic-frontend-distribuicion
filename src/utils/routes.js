import App from "../App";
import {
  IconAgrupamiento,
  IconAsignVehiculo,
  IconCamiones,
  IconCargarVehiculo,
  IconChofer,
  IconDistancias,
  IconGuiaRemitente,
  IconGuiaTransporte,
  IconRutas,
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
  PAGE_MANTENIMIENTO_CHOFERES,
} from "./titles";
import MantenimientoChoferesPage from "../pages/MantenimientoChoferesPage";

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
    icon: <IconAgrupamiento />,
    element: <AgruparODPage />,
  },
  {
    path: "/asignar-vehiculo",
    name: PAGE_ASIGNAR_VEHICULO,
    icon: <IconCargarVehiculo />,
    element: <AsignarVehiculoPage />,
  },
  {
    path: "/generar-grr",
    name: PAGE_GENERAR_GRR,
    icon: <IconGuiaRemitente />,
    element: <GenerarGRR />,
  },
  {
    path: "/generar-ot-grt",
    name: PAGE_GENERAR_OT_Y_GRT,
    icon: <IconGuiaTransporte />,
    element: <GenerarOTyGRT />,
  },
  {
    path: "/mantenimiento/vehiculos",
    name: PAGE_MANTENIMIENTO_VEHICULOS,
    icon: <IconCamiones/>,
    element: <MantenimientoVehiculosPage />,
  },
  {
    path: "/mantenimiento/rutas",
    name: PAGE_MANTENIMIENTO_RUTAS,
    icon: <IconRutas/>,
    element: <MantenimientoRutasPage />,
  },/* 
  {
    path: "/mantenimiento/distritos-rutas",
    name: PAGE_MANTENIMIENTO_DISTRITOS_RUTAS,
    icon: <></>,
    element: <MantenimientoDistritosRutasPage/>,
  }, */
  {
    path: "/mantenimiento/distancias",
    name: PAGE_MANTENIMIENTO_DISTANCIAS,
    icon: <IconDistancias/>,
    element: <MantenimientoDistanciasPage/>,
  },
  {
    path: "/mantenimiento/choferes",
    name: PAGE_MANTENIMIENTO_CHOFERES,
    icon: <IconChofer/>,
    element: <MantenimientoChoferesPage/>,
  },
];

export { routesPages };
