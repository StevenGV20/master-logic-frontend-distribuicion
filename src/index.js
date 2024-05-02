import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
  createBrowserRouter,
  HashRouter,
  Route,
  Routes,
  useRouteError,
  redirect,
} from "react-router-dom";

import { routesPages } from "./utils/routes";
import { buscarCadena } from "./utils/funciones";

const router = createBrowserRouter(routesPages);

const root = ReactDOM.createRoot(document.getElementById("root"));

const rutas = localStorage.getItem("MENUS_CODIFICADO");
const listaModulos = JSON.parse(window.atob(rutas));

function ErrorBoundary() {
  console.error("No page");
  // Uncaught ReferenceError: path is not defined
  redirect("/");
  return (<div></div>)
}

root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router} />     */}
    <BrowserRouter basename="/masterLogic/distribucion/">
      <Routes>
        {routesPages.map((route) => {
          if (buscarCadena(listaModulos, route.path)) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          }
        })}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
