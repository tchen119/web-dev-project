import React from "react";
import {Provider} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {createStore, combineReducers} from "redux";
import userReducer from "../../reducers/user-reducer";
import LoginForm from "./login-form";

const LoginScreen = () => {
  const reducers = combineReducers({userReducer})
  const store = createStore(reducers);

  return(
      <Provider store={store}>
        <button className="btn btn-light">
          <Link to="/" style={{color: "black", textDecoration: "none"}}>
            Back
          </Link>
        </button>
        <LoginForm/>
      </Provider>
  );
}

export default LoginScreen;