import React, {useState, useRef, useEffect} from "react";
import {useDispatch} from "react-redux";
//import {createUser} from "../../actions/user-actions";
import {useNavigate} from "react-router-dom";
import {createUser} from "../../services/user-services";
import {useUser} from "../../contexts/user-context";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState({firstName: '', lastName: '', email: '', password: '', admin: false, favorites: []});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const adminRef = useRef();
  const {signup, checkLoggedIn} = useUser();

  const firstNameChangeHandler = (event) => {
    setFirstName(event.target.value);
  }

  const lastNameChangeHandler = (event) => {
    setLastName(event.target.value);
  }

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  }

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  }

  const confirmPasswordChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
  }

  const adminChangeHandler = (event) => {
    setAdmin(event.target.value);
  }

//  const signUp = () => {
//    if (email !== '' && password !== '' && password === confirmPassword) {
//      setUser({firstName: firstName, lastName: lastName, email: email, password: password, admin: admin});
//      createUser(dispatch, user);
//    }
//  }

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

    if (emailRef.current.value && passwordRef.current.value && passwordRef.current.value === confirmPasswordRef.current.value) {
      try {
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
        <div className="col-4"></div>
        <div className="col-4 container mt-4 pt-2 pb-4 border">
          <center><h1>Signup</h1></center>

          <div className="row ms-3">
            <label className="col-11 form-label">First Name:
              <input className="form-control"
                     ref={firstNameRef}
                     type="text"
                     placeholder="first name"
                     id="firstName"
                     onChange={firstNameChangeHandler}
                     value={firstName}>
              </input>
            </label>
          </div>

          <div className="row ms-3">
            <label className="col-11 form-label">Last Name:
              <input className="form-control"
                     ref={lastNameRef}
                     type="text"
                     placeholder="last name"
                     id="lastName"
                     onChange={lastNameChangeHandler}
                     value={lastName}>
              </input>
            </label>
          </div>

          <div className="row ms-3">
            <label className="col-11 form-label">Email:
              <input className="form-control"
                     ref={emailRef}
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
                     ref={passwordRef}
                     type="password"
                     placeholder="password"
                     id="password"
                     onChange={passwordChangeHandler}
                     value={password}>
              </input>
            </label>
          </div>

          <div className="row ms-3">
            <label className="col-11 form-label">Confirm password:
              <input className="form-control"
                     ref={confirmPasswordRef}
                     type="password"
                     placeholder="password"
                     id="confirmPassword"
                     onChange={confirmPasswordChangeHandler}
                     value={confirmPassword}>
              </input>
            </label>
          </div>

          <div className="row ms-3">
            <label className="col-11 form-label">Admin
              <input className="form-check-inline ms-2"
                     ref={adminRef}
                     type="checkbox"
                     id="admin"
                     onChange={adminChangeHandler}
                     value={admin}>
              </input>
            </label>
          </div>

          <center><button className="btn btn-primary" type="button" onClick={signUp}>Sign up!</button></center>
        </div>
        <div className="col-4"></div>
      </div>
    </>
  );
}

export default SignUpForm;