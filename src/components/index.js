import React from "react";
import NavigationBar from "./navigation-bar";
import {Outlet} from "react-router-dom";

const Restaurant = () => {
  return(
    <>
      <NavigationBar/>
      <Outlet/>
    </>
  );
}

export default Restaurant;