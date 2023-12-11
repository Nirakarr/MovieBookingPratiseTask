import React from "react";
import NavBar from "../Components/Header/NavBar";
import RouteManager from "./RouteManager";

const RouteController = () => {
  return (
    <>
      <NavBar></NavBar>
      <RouteManager/>
    </>
  );
};

export default RouteController;
