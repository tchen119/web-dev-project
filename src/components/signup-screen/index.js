import React from "react";
import {Provider} from "react-redux";
import {createStore, combineReducers} from "redux";
import {Link, useNavigate} from "react-router-dom";
import userReducer from "../../reducers/user-reducer";
import SignUpForm from "./signup-form";

const SignUpScreen = () => {
  const reducers = combineReducers({userReducer})
  const store = createStore(reducers);

  return(
    <Provider store={store}>
      <button className="btn btn-primary">
        <Link to="/" style={{color: '#FFF'}}>
          Back
        </Link>
      </button>
      <SignUpForm/>
    </Provider>
  );
}

export default SignUpScreen;