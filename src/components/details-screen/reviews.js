import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findAllReviews, createReview, deleteReview, updateReview} from '../../services/reviews-services';
import ReviewItem from './review-item';

const Reviews = (businessReviews, bid) => {
  const review_list = businessReviews.businessReviews;
  const [newReview, setNewReview] = useState({});
  const [allReviews, setAllReviews] = useState(review_list);
  const [updatedReview, setUpdatedReview] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [activeModal, setActiveModal] = useState({});
  const user_id = "1";

  const handleAddReview = async () => {
    const results = await createReview(newReview);
    updateAllReviews();
  }

  const handleReviewText = (e) => {
    const review = {review: e.target.value, user_id: user_id, business_id: businessReviews.bid};
    setNewReview(review);
  }

  const handleEditText = (e) => {
    const review = e.target.value;
    setUpdatedReview(review);
  }

  const handleDeleteReview = async (id) => {
    const response = await deleteReview(id);
    updateAllReviews();
  }

  const handleEditReview = async (review) => {
    const modifiedReview = {review: updatedReview};
    const response = await updateReview(review._id, updatedReview);
    console.log(response);
    updateAllReviews();
    setShowModal(false);
  }

  const handleEditButton = (review) => {
    setShowModal(true);
    setActiveModal(review);
  }

  const updateAllReviews = async () => {
    const getAllReviews = await findAllReviews(businessReviews.bid);
    setAllReviews(getAllReviews);
  }

  const Modal = (review) => {
    return(
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Review</h5>
          </div>
          <div class="modal-body">
            <textarea class="form-control" id="editReviews" rows="3" onChange={handleEditText}>{review.review}</textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" onClick={() => handleEditReview(review)}>Save changes</button>
            <button type="button" class="btn btn-secondary" onClick={() => {setShowModal(false)}}>Close</button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setAllReviews(review_list);
  }, [review_list])

  return(
    <>
       <div class="form-group">
          <label for="reviews">Add a Review</label>
          <textarea class="form-control" id="reviews" rows="3" onChange={handleReviewText}></textarea>
       </div>

       <button className="btn btn-primary float-end" onClick={() => handleAddReview()}>
         Add
       </button>

       <ul className="list-group">
         {
            allReviews.map && allReviews.map((review) => {
              return(
                <>
                  <li className="list-group-item">
                    {review.review}
                    <i onClick={() => handleDeleteReview(review._id)} className="fas fa-remove fa-2x fa-pull-right"/>
                    <i className="fas fa-edit fa-2x fa-pull-right" onClick={() => handleEditButton(review)}/>
                  </li>
                </>
              );
            })
         }
         {showModal ? Modal(activeModal) : null}
       </ul>
    </>
  );
}

export default Reviews;