import React from "react";

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
              <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/profile">Profile</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/search">Search</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavigationBar;