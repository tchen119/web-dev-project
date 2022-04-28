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
              <div className="nav-link "><Link to="/" style={{textDecoration: "none"}} className="text-secondary">Home</Link></div>
            </li>
            {loggedIn ?
              <li className="nav-item col-1">
                <div className="nav-link "><Link to="/profile" style={{textDecoration: "none"}} className="text-secondary">Profile</Link></div>
              </li>
              :
              null
            }
            <li className="nav-item col-1">
              <div className="nav-link "><Link to="/search" style={{textDecoration: "none"}} className="text-secondary">Search</Link></div>
            </li>
            <li className="nav-item col-5">
              <div className="nav-link "><Link to="/privacy" style={{textDecoration: "none"}} className="text-secondary">Privacy Policy</Link></div>
            </li>
            {!loggedIn ?
              <>
                <li className="nav-item col-4">
                  <a className="btn wd-background mb-1" role="button"><Link to="/signup" style={{textDecoration: "none"}} className="text-dark">Sign Up</Link></a>
                  &nbsp;
                  <a className="btn wd-background" role="button"><Link to="/login" style={{textDecoration: "none"}} className="text-dark">Log In</Link></a>
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