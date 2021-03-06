import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {profile} from "../../services/user-services";
import {findAllReviews, createReview, deleteReview, updateReview} from '../../services/reviews-services';
import {addDeletedReview, addUpdatedReview} from '../../services/admin-services';
import {findUserById} from "../../services/user-services";
import {useUser} from "../../contexts/user-context";

const Reviews = ({businessReviews, bid, bName}) => {
  const [newReview, setNewReview] = useState("");
  const [allReviews, setAllReviews] = useState(businessReviews);
  const [updatedReview, setUpdatedReview] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [activeModal, setActiveModal] = useState({});
  const {user, checkLoggedIn, loggedIn} = useUser();

  const handleAddReview = async () => {
    const results = await createReview(newReview);
    updateAllReviews();
  }

  const handleReviewText = (e) => {
    const review = {review: e.target.value, user_id: user._id, business_id: bid, business_name: bName, first_name: user.firstName, last_name: user.lastName};
    console.log(review);
    setNewReview(review);
  }

  const handleEditText = (e) => {
    const review = e.target.value;
    setUpdatedReview(review);
  }

  const handleDeleteReview = async (review) => {
    await deleteReview(review._id);
    updateAllReviews();

    //add to admin's history
    if (user.admin) {
      try {
        await addDeletedReview(user._id, review);
      } catch (e) {
        console.log("error adding to admin history");
        console.log(e);
      }
    }
  }

  const handleEditReview = async (review) => {
    const modifiedReview = {review: updatedReview};
    const response = await updateReview(review._id, updatedReview);
    console.log(response);
    updateAllReviews();
    setShowModal(false);

    //add to admin's history
    if (user.admin) {
      const editedReview = {
        user_id: review.user_id,
        first_name: review.first_name,
        last_name: review.last_name,
        business_id: review.business_id,
        business_name: review.business_name,
        old_review: review.review,
        new_review: updatedReview
      }
      try {
        await addUpdatedReview(user._id, editedReview);
      } catch (e) {
        console.log("error adding to admin history");
        console.log(e);
      }
    }
  }

  const handleEditButton = (review) => {
    setShowModal(true);
    setActiveModal(review);
  }

  const updateAllReviews = async () => {
    const getAllReviews = await findAllReviews(bid);
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
    setAllReviews(businessReviews);
    checkLoggedIn();
    //getCurrUser();
  }, [businessReviews])

  return(
    <div className="wd-padding">
      <div class="card shadow">
        <div class="card-header wd-font">
          Reviews
        </div>
        <div class="card-body">
          {loggedIn ?
            <div>
              <div class="form-group">
                <textarea class="form-control" id="reviews" rows="3" onChange={handleReviewText}></textarea>
              </div>
              <div className="row wd-padding">
                <button className="btn wd-background float-end" onClick={() => handleAddReview()}>
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
                      {loggedIn && user && (review.user_id === user._id || user.admin) ?
                        <div className="wd-right">
                            <i className="fas fa-remove fa-2x fa-pull-right" onClick={() => handleDeleteReview(review)}/>
                            <i className="fas fa-edit fa-2x fa-pull-right" onClick={() => handleEditButton(review)}/>
                        </div>
                        : null
                      }
                      {loggedIn ?
                        <Link to={`/profile/${review.user_id}`} style={{textDecoration: 'none'}}><p className="wd-bold wd-left wd-blue">{review.first_name + " " + review.last_name}</p></Link>
                        :
                        <p className="wd-bold wd-left text-secondary">{review.first_name + " " + review.last_name}</p>
                      }
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