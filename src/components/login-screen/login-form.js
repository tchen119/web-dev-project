import React, {useState, useRef} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
//import {findUser} from "../../actions/user-actions";
import {findUser} from "../../services/user-services";
import axios from 'axios';
import {useUser} from "../../contexts/user-context";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({email: '', password: ''});
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const {login} = useUser();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  }

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  }

//  const login = () => {
//    if (email !== '' && pass !== '') {
//      setUser({email: email, password: password});
//      findUser(dispatch, user);
//    }
//  }

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
        <div className="col-4"></div>
        <div className="col-4 container mt-4 pt-2 pb-4 border">
          <center><h1>Login</h1></center>

          <div className="row ms-3">
            <label className="col-11 form-label">Email:
              <input className="form-control"
                     ref = {emailRef}
                     type="email"
                     placeholder="email"
                     id="email"
                     onChange={emailChangeHandler}
                     value={email}>
              </input>
            </label>
          </div>

          <div className="row ms-3">
            <label className="col-11 form-label">Password:
              <input className="form-control"
                     ref = {passwordRef}
                     type="password"
                     placeholder="password"
                     id="password"
                     onChange={passwordChangeHandler}
                     value={password}>
              </input>
            </label>
          </div>

          <center><button className="btn btn-primary" type="button" onClick={handleLogin}>Log in!</button></center>
        </div>
        <div className="col-4"></div>
      </div>
  );
}

export default LoginForm;