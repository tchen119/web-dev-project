import React from "react";
import {Link} from "react-router-dom";

const NavigationBar = () => {
  return(
    <>
      <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <a class="navbar-brand">Restaurants</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/search">Search</Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/privacy">Privacy</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavigationBar;