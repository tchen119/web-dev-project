import React, {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {findUser} from "../../services/user-services";
import axios from 'axios';
import {useUser} from "../../contexts/user-context";
import "../../index.css";

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const {login} = useUser();

  const handleLogin = async () => {
    if (!emailRef.current.value) {
      alert("Please enter an email");
    } else if (!passwordRef.current.value) {
      alert("Please enter a password");
    } else {
      try {
        const userObject = {email: emailRef.current.value, password: passwordRef.current.value}
        const response = await login(userObject);
        navigate('/profile');
      } catch (e) {
        alert("Account not found. Please try again");
      }
    }
  }

  return(
    <div className="row">
      <div className="col-6 container mt-4 pt-2 pb-4 border px-2 bg-light rounded shadow">
        <center><h1>Login</h1></center>

        <div className="row ms-3">
          <label className="col-11 form-label">Email:
            <input className="form-control"
                   ref = {emailRef}
                   type="email"
                   placeholder="Enter Email"
                   id="email">
            </input>
          </label>
        </div>

        <div className="row ms-3">
          <label className="col-11 form-label">Password:
            <input className="form-control"
                   ref = {passwordRef}
                   type="password"
                   placeholder="Enter Password"
                   id="password">
            </input>
          </label>
        </div>

        <center><button className="btn wd-background" type="button" onClick={handleLogin}>Log in!</button></center>
      </div>
    </div>
  );
}

export default LoginForm;