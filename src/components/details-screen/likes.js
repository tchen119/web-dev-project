import React, {useEffect, useState} from "react";
import {addLike, updateLike, findLike, findLikes, findDislikes} from "../../services/likes-services";
import {profile} from "../../services/user-services";

const Likes = (businessLikes, id) => {
  const allLikes = businessLikes.businessLikes;
  const bid = businessLikes.bid;

  const [currStatus, setCurrStatus] = useState("none");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const [currUser, setCurrUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  const getCurrUser = async () => {
    try {
      const user = await profile();
      setCurrUser(user[0]);
      setUserId(user[0]._id);
      setLoggedIn(true);
      console.log("from curr user");
      console.log(currUser);
      console.log(userId);
    } catch (e) {
      setLoggedIn(false);
    }
  }

  const getNumLikes = async () => {
    const response = await findLikes(bid);
    setLikes(response.length);
  }

  const getNumDislikes = async () => {
    const response = await findDislikes(bid);
    setDislikes(response.length);
  }

  const getCurrentStatus = async () => {
    console.log("looking for status");
    console.log(currUser);
    console.log(userId);
    if (userId) {
      const response = await findLike(userId, bid);
      console.log("current status");
      console.log(response);
      if (response && response[0].like) {
        setCurrStatus("like");
      } else if (response && !response[0].like) {
        setCurrStatus("dislike");
      } else {
        setCurrStatus("none");
      }
    }
  }

  const likeBusiness = async () => {
    if (currStatus == "none") {
      const likeObject = {user_id: userId, business_id: bid, like: true};
      const response = await addLike(likeObject);
    } else if (currStatus == "dislike") {
      const response = await updateLike(userId, bid, true);
      setDislikes(dislikes - 1);
    }
    setCurrStatus("like");
    setLikes(likes + 1);
  }

  const dislikeBusiness = async () => {
    if (currStatus === "none") {
      const dislikeObject = {user_id: userId, business_id: bid, like: false};
      const response = await addLike(dislikeObject);
    } else if (currStatus === "like") {
      const response = await updateLike(userId, bid, false);
      setLikes(likes - 1);
    }
    setCurrStatus("dislike");
    setDislikes(dislikes + 1);
  }

  useEffect(() => {
    getCurrUser();
    getNumLikes();
    getNumDislikes();
    getCurrentStatus();
  }, []);

  return(
    <>
      {!loggedIn || currStatus === "like" ?
        <button className="btn btn-primary" disabled>
          Likes &nbsp; {likes}
        </button>
        :
        <button className="btn btn-primary" onClick={likeBusiness}>
          Likes &nbsp; {likes}
        </button>
      }
      &nbsp;
      {!loggedIn || currStatus === "dislike" ?
        <button className="btn btn-primary" disabled>
          Dislikes &nbsp; {dislikes}
        </button>
        :
        <button className="btn btn-primary" onClick={dislikeBusiness}>
          Dislikes &nbsp; {dislikes}
        </button>
      }
    </>
  );
}

export default Likes;