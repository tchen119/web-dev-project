import React from "react";

const NavigationBar = () => {
  return(
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <a className="navbar-brand">Restaurants</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav w-100 row">
            <li className="nav-item active col-1">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item col-1">
              <a className="nav-link" href="/profile">Profile</a>
            </li>
            <li className="nav-item col-1">
              <a className="nav-link" href="/search">Search</a>
            </li>
            <li className="nav-item col-7">
              <a className="nav-link" href="/privacy">Privacy Policy</a>
            </li>
            <li className="nav-item col-1">
              <a className="nav-link" href="/signup">Sign Up</a>
            </li>
            <li className="nav-item col-1">
              <a className="nav-link" href="/login">Log in</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavigationBar;