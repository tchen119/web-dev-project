import React, {useState, useEffect} from "react";
import Logout from '../logout';
import {profile} from "../../services/user-services";
import {Link} from "react-router-dom";

const NavigationBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const getCurrUser = async () => {
    try {
      const user = await profile();
      setLoggedIn(true);
    } catch (e) {
      setLoggedIn(false);
    }
  }

  useEffect(() => {
    getCurrUser();
  }, [loggedIn]);

  return(
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <a className="navbar-brand">RestaurantAdvisor</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav w-100 row">
            <li className="nav-item active col-1">
              <a className="nav-link" href="/">Home</a>
            </li>
            {loggedIn ?
              <li className="nav-item col-1">
                <div className="nav-link "><Link to="/profile" style={{textDecoration: "none"}} className="text-secondary">Profile</Link></div>
              </li>
              :
              null
            }
            <li className="nav-item col-1">
              <a className="nav-link" href="/search">Search</a>
            </li>
            <li className="nav-item col-5">
              <a className="nav-link" href="/privacy">Privacy Policy</a>
            </li>
            {!loggedIn ?
              <>
                <li className="nav-item col-4">
                  <a className="btn wd-background" href="/signup" role="button">Sign Up</a>
                  &nbsp;
                  <a className="btn wd-background" href="/login" role="button">Log in</a>
                </li>
              </>
              :
              null
            }
            {loggedIn ?
              <li className="nav-item col-1">
                <Logout/>
              </li>
              :
              null
            }
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavigationBar;