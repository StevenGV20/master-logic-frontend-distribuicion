import App from "../App";
import { Agrupamiento, AsignVehiculo, GuiaRemitente, GuiaTransporte } from "../icons/icons-svg";
import AgruparODPage from "../pages/AgruparODPage";
import AsignarVehiculoPage from "../pages/AsignarVehiculoPage";
import GenerarGRR from "../pages/GenerarGRR";
import GenerarOTyGRT from "../pages/GenerarOTyGRT";
import {PAGE_GENERAR_GRR,PAGE_AGRUPAR_OD,PAGE_ASIGNAR_VEHICULO,PAGE_GENERAR_OT_Y_GRT} from "./titles";

const routesPages = [
  {
    path: "/",
    name: "DISTRIBUICION",
    icon: "",
    element: <App/>
  },
  {
    path: "/agrupar-orden-despacho",
    name: PAGE_AGRUPAR_OD,
    icon: <Agrupamiento />,
    element: <AgruparODPage/>
  },
  {
    path: "/asignar-vehiculo",
    name: PAGE_ASIGNAR_VEHICULO,
    icon: <AsignVehiculo />,
    element: <AsignarVehiculoPage/>
  },
  {
    path: "/generar-grr",
    name: PAGE_GENERAR_GRR,
    icon: <GuiaRemitente />,
    element: <GenerarGRR/>
  },
  {
    path: "/generar-ot-grt",
    name: PAGE_GENERAR_OT_Y_GRT,
    icon: <GuiaTransporte />,
    element: <GenerarOTyGRT/>
  },
];

export { routesPages };
