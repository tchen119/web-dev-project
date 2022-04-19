import React, {useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {profile} from "../../services/user-services";
import axios from 'axios';
import {useUser} from "../../contexts/user-context";

const ProfileScreen = () => {
  const [currUser, setCurrUser] = useState({});
  const navigate = useNavigate();
  const {user} = useUser();

  const getCurrUser = async () => {
    try {
      const user = await profile();
      setCurrUser(user);
    } catch (e) {
      navigate('/');
    }
  }

  useEffect(() => {
    getCurrUser();
  }, []);

  return(
    <>
      <h1>Profile</h1>
      {JSON.stringify(currUser)}
    </>
  );
}

export default ProfileScreen;