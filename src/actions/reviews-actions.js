import * as service from '../services/reviews-services';

export const CREATE_REVIEW = 'CREATE_REVIEW';
export const FIND_ALL_REVIEWS = 'FIND_ALL_REVIEWS';
export const FIND_REVIEW = 'FIND_REVIEW';
export const UPDATE_REVIEW = 'UPDATE_REVIEW';
export const DELETE_REVIEW = 'DELETE_REVIEW';

export const createReview = async (dispatch, review) => {
  const newReview = await service.createReview(review);
  dispatch({
    type: CREATE_REVIEW,
    newReview
  });
}

export const findAllReviews = async (dispatch, business_id) => {
  const reviews = await service.findAllReviews(business_id);
  dispatch({
    type: FIND_ALL_REVIEWS,
    reviews
  })
}

export const findReview = async () => {

}

export const updateReview = async () => {

}

export const deleteReview = async () => {

}


