import React, {useState, useEffect} from "react";
import axios from "axios";
import {deleteReview} from '../../services/reviews-services';

const ReviewItem = (review) => {
  const data = review.review;

  const handleDeleteReview = async () => {
    const response = await deleteReview(data._id);
    console.log(response);
  }
  const handleEditReview = async () => {
  }

  return(
    <>
      <li className="list-group-item">
        {data.review}
        <i onClick={handleDeleteReview} className="fas fa-remove fa-2x fa-pull-right"/>
        <i onClick={handleEditReview} className="fas fa-edit fa-2x fa-pull-right"/>
      </li>
    </>
  );
}

export default ReviewItem;