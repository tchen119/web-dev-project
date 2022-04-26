import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import NavigationBar from "./navigation-bar";

const Restaurant = () => {
  return(
    <>
      <div className="bg-white">
        <div className="container">
          <NavigationBar/>
        </div>
      </div>
      <div className="container">
        <Outlet/>
      </div>
    </>
  );
}

export default Restaurant;