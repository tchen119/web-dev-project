import React from "react";

const Likes = () => {
  const likeBusiness = () => {
    console.log("like");
  }

  const dislikeBusiness = () => {
    console.log("dislike");
  }

  return(
    <>
      <button className="btn btn-primary" onClick={likeBusiness}>
        Like
      </button>
      <button className="btn btn-primary" onClick={dislikeBusiness}>
        Dislike
      </button>
    </>
  );
}

export default Likes;