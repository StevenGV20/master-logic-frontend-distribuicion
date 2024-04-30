import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import OpcionCardComponent from "../components/OpcionCardComponent";
import AgruparODPage from "./AgruparODPage";
import { routesPages } from "../utils/routes";
const Home = () => {
  return (
    <div className="w-full p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-8 gap-12">
        {routesPages.map((route) => (
          <>
            {route.path != "/" && (
              <NavLink to={route.path} key={route.path}>
                <OpcionCardComponent route={route} />
              </NavLink>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;
