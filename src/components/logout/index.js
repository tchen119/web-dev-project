import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {logout} from "../../services/user-services";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();
      navigate('/login');
    } catch (e) {
      alert("Internal service error.");
    }
  }

  return(
    <>
      <button className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default Logout;