import React, {useEffect, useState} from "react";
import {useUser} from "../../contexts/user-context";
import Favorite from "./favorite";

const Favorites = () => {
  const {user} = useUser();


  return(
      <>
        <h1>My Favorites</h1>
        <ul>
          {user && user.favorites && user.favorites.length === 0 ?
          <p>Liked restaurants will show up here!</p> : ""}
          {user && user.favorites && user.favorites.map((fave) => {
            return <Favorite fave={fave}/>
          })}
        </ul>
      </>
  );
}

export default Favorites;