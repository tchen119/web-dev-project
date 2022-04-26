import React, {useEffect, useState} from "react";
import {addLike, updateLike, findLike, findLikes, findDislikes} from "../../services/likes-services";
import {
  userAddFavorite,
  profile,
  userRemoveFavorite
} from "../../services/user-services";
import {useUser} from "../../contexts/user-context";

const Likes = ({businessLikes, bid, bName}) => {
  const [currStatus, setCurrStatus] = useState("none");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const {user, checkLoggedIn, loggedIn} = useUser();

  const getNumLikes = async () => {
    const response = await findLikes(bid);
    setLikes(response.length);
  }

  const getNumDislikes = async () => {
    const response = await findDislikes(bid);
    setDislikes(response.length);
  }

  const getCurrentStatus = async () => {
    if (user) {
      const response = await findLike(user._id, bid);
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
      const likeObject = {user_id: user._id, first_name: user.firstName, last_name: user.lastName, business_id: bid, business_name: bName, like: true};
      const response = await addLike(likeObject);
    } else if (currStatus == "dislike") {
      const response = await updateLike(user._id, bid, true);
      setDislikes(dislikes - 1);
    }
    const response2 = await userAddFavorite( {bid: bid});
    setCurrStatus("like");
    setLikes(likes + 1);
  }

  const dislikeBusiness = async () => {
    if (currStatus === "none") {
      const dislikeObject = {user_id: user._id, first_name: user.first_name, last_name: user.last_name, business_id: bid, business_name: bName, like: false};
      const response = await addLike(dislikeObject);
    } else if (currStatus === "like") {
      const response = await updateLike(user._id, bid, false);
      setLikes(likes - 1);
    }
    const response2 = await userRemoveFavorite(bid);
    setCurrStatus("dislike");
    setDislikes(dislikes + 1);
  }

  const unlikeBusiness = () => {
    console.log("unliked");
  }

  useEffect(() => {
    checkLoggedIn();
    //getCurrUser();
    getNumLikes();
    getNumDislikes();
    getCurrentStatus();
  }, []);

  return(
    <>
      {!loggedIn || currStatus === "like" ?
        <button className="btn btn-light shadow" disabled onClick={unlikeBusiness}>
          Likes &nbsp; {likes}
        </button>
        :
        <button className="btn btn-light shadow" onClick={likeBusiness}>
          Likes &nbsp; {likes}
        </button>
      }
      &nbsp;
      {!loggedIn || currStatus === "dislike" ?
        <button className="btn btn-light shadow" disabled>
          Dislikes &nbsp; {dislikes}
        </button>
        :
        <button className="btn btn-light shadow" onClick={dislikeBusiness}>
          Dislikes &nbsp; {dislikes}
        </button>
      }
    </>
  );
}

export default Likes;