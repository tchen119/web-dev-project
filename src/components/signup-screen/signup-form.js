import React, {useState, useRef, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createUser} from "../../services/user-services";
import {useUser} from "../../contexts/user-context";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const adminRef = useRef();
  const adminPasswordRef = useRef();
  const {signup, checkLoggedIn} = useUser();
  const ADMIN_PASSWORD = "super_secret_password";

  const signUp = async () => {
    if (!emailRef.current.value) {
      alert("Please enter a email");
    }

    if (!passwordRef.current.value) {
      alert("Please enter a password");
    }

    if (!(passwordRef.current.value === confirmPasswordRef.current.value)) {
      alert("Please make sure passwords match.");
    }

    if (adminRef.current.checked && adminPasswordRef.current.value != ADMIN_PASSWORD) {
      alert("Please enter correct admin password.");
    }

    if (emailRef.current.value && passwordRef.current.value && passwordRef.current.value === confirmPasswordRef.current.value && (!adminRef.current.checked || (adminRef.current.checked && adminPasswordRef.current.value === ADMIN_PASSWORD))) {
      try {
        console.log("signing up");
        const userObject = {
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          admin: adminRef.current.checked
        }
        const response = await signup(userObject);
        navigate('/privacy');
      } catch (e) {
        alert('email already in use');
      }
    }
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return(
    <>
      <div className="row">
        <div className="col-6 container mt-4 pt-2 pb-4 border px-2 bg-light">
          <center><h1>Signup</h1></center>

          <div className="row ms-3">
            <label className="col-11 form-label">First Name:
              <input className="form-control"
                     ref={firstNameRef}
                     type="text"
                     placeholder="First Name"
                     id="firstName">
              </input>
            </label>
          </div>

          <div className="row ms-3">
            <label className="col-11 form-label">Last Name:
              <input className="form-control"
                     ref={lastNameRef}
                     type="text"
                     placeholder="Last Name"
                     id="lastName">
              </input>
            </label>
          </div>

          <div className="row ms-3">
            <label className="col-11 form-label">Email:
              <input className="form-control"
                     ref={emailRef}
                     type="email"
                     placeholder="Email"
                     id="email">
              </input>
            </label>
          </div>

          <div className="row ms-3">
            <label className="col-11 form-label">Password:
              <input className="form-control"
                     ref={passwordRef}
                     type="password"
                     placeholder="Password"
                     id="password">
              </input>
            </label>
          </div>

          <div className="row ms-3">
            <label className="col-11 form-label">Confirm password:
              <input className="form-control"
                     ref={confirmPasswordRef}
                     type="password"
                     placeholder="Password"
                     id="confirmPassword">
              </input>
            </label>
          </div>

          <div className="row ms-3">
            <label className="col-11 form-label">Admin
              <input className="form-check-inline ms-2"
                     ref={adminRef}
                     type="checkbox"
                     id="admin">
              </input>
              <input className="form-control"
                     ref={adminPasswordRef}
                     type="password"
                     placeholder="Admin Password"
                     id="admin_password">
              </input>
            </label>
          </div>

          <center><button className="btn btn-primary" type="button" onClick={signUp}>Sign up!</button></center>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;