import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {findUser} from "../../actions/user-actions";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({email: '', password: ''});
  const dispatch = useDispatch();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  }

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  }

  const login = () => {
    if (email !== '' && password !== '') {
      setUser({email: email, password: password});
      findUser(dispatch, user);
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
                     type="password"
                     placeholder="password"
                     id="password"
                     onChange={passwordChangeHandler}
                     value={password}>
              </input>
            </label>
          </div>

          <center><button className="btn btn-primary" type="button" onClick={login}>Log in!</button></center>
        </div>
        <div className="col-4"></div>
      </div>
  );
}

export default LoginForm;