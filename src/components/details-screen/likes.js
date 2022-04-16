import React, {useEffect, useState} from "react";
import {addLike, updateLike, findLike, findLikes, findDislikes} from "../../services/likes-services";

const Likes = (businessLikes, id) => {
  const allLikes = businessLikes.businessLikes;
  const bid = businessLikes.bid;
  const currUser = "2";

  const [currStatus, setCurrStatus] = useState("none");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const getNumLikes = async () => {
    const response = await findLikes(bid);
    return response.length;
  }

  const getNumDislikes = async () => {
    const response = await findDislikes(bid);
    return response.length;
  }

  const getCurrentStatus = async () => {
    const response = await findLike(currUser, bid);
    console.log("checking status response");
    console.log(response);
    setCurrStatus(response[0].like);
  }

  const likeBusiness = async () => {
    if (currStatus == "none") {
      const likeObject = {user_id: currUser, business_id: bid, like: true};
      const response = await addLike(likeObject);
    } else if (currStatus == "dislike") {
      const response = await updateLike(currUser, bid, true);
      setDislikes(dislikes - 1);
    }
    setCurrStatus("like");
    setLikes(likes + 1);
  }

  const dislikeBusiness = async () => {
    if (currStatus == "none") {
      const dislikeObject = {user_id: currUser, business_id: bid, like: false};
      const response = await addLike(dislikeObject);
    } else if (currStatus == "like") {
      const response = await updateLike(currUser, bid, false);
      setLikes(likes - 1);
    }
    setCurrStatus("dislike");
    setDislikes(dislikes + 1);
  }

  useEffect(async () => {
    const numLikes = await getNumLikes();
    const numDislikes = await getNumDislikes();
    setLikes(numLikes);
    setDislikes(numDislikes);
    //fix dislikes
    const statusData = await getCurrentStatus();
  }, []);

  return(
    <>
      {currStatus == "like" ?
        <button className="btn btn-primary" disabled>
          Like &nbsp; {likes}
        </button>
        :
        <button className="btn btn-primary" onClick={likeBusiness}>
          Like &nbsp; {likes}
        </button>
      }
      &nbsp;
      {currStatus == "dislike" ?
        <button className="btn btn-primary" disabled>
          Dislike &nbsp; {dislikes}
        </button>
        :
        <button className="btn btn-primary" onClick={dislikeBusiness}>
          Dislike &nbsp; {dislikes}
        </button>
      }
    </>
  );
}

export default Likes;

//  let status = "none";

//  let likesList = [];
//  let dislikesList = [];

//  for (var key in allLikes) {
//    if (allLikes[key].like == true) {
//      likesList = [...likesList, allLikes[key]];
//    } else {
//      dislikesList = [...dislikesList, allLikes[key]];
//    }
//    if (allLikes[key].user_id == currUser && allLikes[key].business_id == bid) {
//      if (allLikes[key].like) {
//        status = "like";
//      } else {
//        status = "dislike";
//      }
//    }
//  }
//  const likedStatus = likesList.find((item) => { return item.user_id == currUser && item.business_id == bid});
//  if (likedStatus) {
//    setCurrStatus("like");
//  }
//  const dislikeStatus = dislikesList.find((item) => { return item.user_id == currUser && item.business_id == bid});
//  if (dislikeStatus) {
//    setCurrStatus("dislike");
//  }