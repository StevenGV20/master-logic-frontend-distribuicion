import App from "../App";
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
    icon: "",
    element: <AgruparODPage/>
  },
  {
    path: "/asignar-vehiculo",
    name: PAGE_ASIGNAR_VEHICULO,
    icon: "",
    element: <AsignarVehiculoPage/>
  },
  {
    path: "/generar-grr",
    name: PAGE_GENERAR_GRR,
    icon: "",
    element: <GenerarGRR/>
  },
  {
    path: "/generar-ot-grt",
    name: PAGE_GENERAR_OT_Y_GRT,
    icon: "",
    element: <GenerarOTyGRT/>
  },
];

export { routesPages };
