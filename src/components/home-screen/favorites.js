import React, {useEffect, useState} from "react";
import {useUser} from "../../contexts/user-context";
import Favorite from "./favorite";

const Favorites = () => {
  const {user} = useUser();

  return(
      <div className="card my-4">
        <div className="card-header">My Favorites</div>
        <ul className="m-0 p-0">
          {user && user.favorites && user.favorites.length === 0 ?
          <p>Liked restaurants will show up here!</p> : ""}
          {user && user.favorites && user.favorites.map((fave) => {
            return <Favorite fave={fave}/>
          })}
        </ul>
      </div>
  );
}

export default Favorites;