import React, {useContext, useState} from "react";
import axios from "axios";
import {findUser, createUser, profile, logout} from "../../services/user-services";

const UserContext = React.createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState({});

  const login = async (credentials) => {
    try {
      const response = await findUser(credentials);
      setUser(response);
    } catch (e) {
      throw e;
    }
  }

  const signup = async (credentials) => {
    try {
      const response = await createUser(credentials);
      setUser(response);
    } catch (e) {
      throw e;
    }
  }

  const signout = async () => {
    const response = await logout();
    setUser(null);
  }

  const checkLoggedIn = async () => {
    try {
      const response = await profile();
      setUser(response);
      return response;
    } catch (e) {
      throw e;
    }
  }

  const value = {login, signup, signout, checkLoggedIn, user};

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
}