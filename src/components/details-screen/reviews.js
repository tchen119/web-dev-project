import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findAllReviews, createReview, deleteReview} from '../../services/reviews-services';
import ReviewItem from './review-item';

const Reviews = (businessReviews, bid) => {
  const review_list = businessReviews.businessReviews;
  const [newReview, setNewReview] = useState({});
  const [allReviews, setAllReviews] = useState(review_list);
  console.log(allReviews);
  console.log(review_list);

  const handleAddReview = async () => {
    const results = await createReview(newReview);
    const getAllReviews = await findAllReviews(businessReviews.bid);
    setAllReviews(getAllReviews);
  }

  const handleReviewText = (e) => {
    const review = {review: e.target.value, user_id: "1", business_id: businessReviews.bid};
    setNewReview(review);
  }

  const handleDeleteReview = async (review) => {
    console.log("deleting");
    const response = await deleteReview(review);
    const getAllReviews = await findAllReviews(businessReviews.bid);
    setAllReviews(getAllReviews);
  }

  useEffect(() => {
    setAllReviews(review_list);
  }, [review_list])

  return(
    <>
       <div class="form-group">
          <label for="reviews">Add a Review</label>
          <textarea class="form-control" id="reviews" rows="3" onChange={handleReviewText}></textarea>
       </div>

       <button className="btn btn-primary float-end" onClick={handleAddReview}>
         Add
       </button>

       <ul className="list-group">
         {
            allReviews.map && allReviews.map(review =>
              <ReviewItem key={review._id} review={review}/>)
         }
       </ul>
    </>
  );
}

export default Reviews;