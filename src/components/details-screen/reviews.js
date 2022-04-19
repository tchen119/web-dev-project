import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {profile} from "../../services/user-services";
import {findAllReviews, createReview, deleteReview, updateReview} from '../../services/reviews-services';
import {findUserById} from "../../services/user-services";
import {useUser} from "../../contexts/user-context";

const Reviews = (businessReviews, bid) => {
  const review_list = businessReviews.businessReviews;
  const [newReview, setNewReview] = useState("");
  const [allReviews, setAllReviews] = useState(review_list);
  const [updatedReview, setUpdatedReview] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [activeModal, setActiveModal] = useState({});
  // const [currUser, setCurrUser] = useState({});
  // const [userId, setUserId] = useState("");
  // const [admin, setAdmin] = useState(false);
  // const [loggedIn, setLoggedIn] = useState(false);
  const {user, checkLoggedIn, loggedIn} = useUser();

//  const getCurrUser = async () => {
//    try {
//      const user = await profile();
//      setCurrUser(user[0]);
//      setUserId(user[0]._id);
//      setAdmin(user[0].admin);
//      setLoggedIn(true);
//    } catch (e) {
//      setLoggedIn(false);
//    }
//  }

  const handleAddReview = async () => {
    const results = await createReview(newReview);
    updateAllReviews();
  }

  const handleReviewText = (e) => {
    const review = {review: e.target.value, user_id: user._id, business_id: businessReviews.bid, first_name: user.firstName, last_name: user.lastName};
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
    checkLoggedIn();
    //getCurrUser();
  }, [review_list])

  return(
    <div className="wd-padding">
      <div class="card">
        <div class="card-header">
          Reviews
        </div>
        <div class="card-body">
          {loggedIn ?
            <div>
              <div class="form-group">
                <textarea class="form-control" id="reviews" rows="3" onChange={handleReviewText}></textarea>
              </div>
              <div className="row wd-padding">
                <button className="btn btn-primary float-end" onClick={() => handleAddReview()}>
                   Add
                </button>
              </div>
            </div>
            :
            <p>Sign in to add a review!</p>
          }
          <ul className="list-group">
             {allReviews.map && allReviews.map((review) => {
                return(
                  <>
                    <li className="list-group-item">
                      {loggedIn && (review.user_id === user._id || user.admin) ?
                        <div className="wd-right">
                            <i className="fas fa-remove fa-2x fa-pull-right" onClick={() => handleDeleteReview(review._id)}/>
                            <i className="fas fa-edit fa-2x fa-pull-right" onClick={() => handleEditButton(review)}/>
                        </div>
                        : null
                      }
                      <p className="wd-bold wd-left">{review.first_name + " " + review.last_name}</p>
                      <p className="wd-left">{review.review}</p>
                    </li>
                  </>
                );
               })
             }
          </ul>
          {showModal ? Modal(activeModal) : null}
        </div>
      </div>
    </div>
  );
}

export default Reviews;