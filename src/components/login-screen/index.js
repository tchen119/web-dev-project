import React from "react";
import {Provider} from "react-redux";
import {createStore, combineReducers} from "redux";
import userReducer from "../../reducers/user-reducer";
import LoginForm from "./login-form";

const LoginScreen = () => {
  const reducers = combineReducers({userReducer})
  const store = createStore(reducers);

  return(
      <Provider store={store}>
        <LoginForm/>
      </Provider>
  );
}

export default LoginScreen;