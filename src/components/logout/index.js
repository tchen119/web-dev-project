import React from "react";
import {Link, useNavigate} from "react-router-dom";
// import {logout} from "../../services/user-services";
import {useUser} from "../../contexts/user-context";

const Logout = () => {
  const navigate = useNavigate();
  const {signout} = useUser();

  const handleLogout = async () => {
    try {
      const response = await signout();
      navigate('/login');
    } catch (e) {
      alert("Internal service error");
      navigate('/login');
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