import React from "react";
import {Provider} from "react-redux";
import {createStore, combineReducers} from "redux";
import userReducer from "../../reducers/user-reducer";
import SignUpForm from "./signup-form";

const SignUpScreen = () => {
  const reducers = combineReducers({userReducer})
  const store = createStore(reducers);

  return(
    <Provider store={store}>
      <SignUpForm/>
    </Provider>
  );
}

export default SignUpScreen;