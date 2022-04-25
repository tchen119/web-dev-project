import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import NavigationBar from "./navigation-bar";
import reviewsReducer from "../reducers/reviews-reducer";

const Restaurant = () => {
//  const reducer = combineReducers({
//                    reviews: reviewsReducer
//                  });
//  const store = createStore(reducer);

  return(
    <>
      <NavigationBar/>
      <Outlet/>
    </>
  );
}

export default Restaurant;