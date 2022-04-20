import React, {useContext, useState, useEffect} from "react";
import axios from "axios";
import {findUser, createUser, profile, logout} from "../services/user-services";

const UserContext = React.createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (credentials) => {
    try {
      const response = await findUser(credentials);
      setUser(response[0]);
      setLoggedIn(true);
    } catch (e) {
      throw e;
    }
  }

  const signup = async (credentials) => {
    try {
      const response = await createUser(credentials);
      setUser(response[0]);
      setLoggedIn(true);
    } catch (e) {
      throw e;
    }
  }

  const signout = async () => {
    const response = await logout();
    setUser(null);
    setLoggedIn(false);
  }

  const checkLoggedIn = async () => {
    try {
      const response = await profile();
      setUser(response[0]);
      setLoggedIn(true);
      return response;
    } catch (e) {
      throw e;
    }
  }

  const value = {login, signup, signout, checkLoggedIn, user, loggedIn};

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
}