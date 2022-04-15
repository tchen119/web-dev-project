import {CREATE_REVIEW, FIND_ALL_REVIEWS} from '../actions/reviews-actions';

const reviewsReducer = (state, action) => {
  switch (action.type) {
    case CREATE_REVIEW:
      return [
        action.review,
        ...state
      ]
    case FIND_ALL_REVIEWS:
      return action.reviews;
    default:
      return [];
  }
}

export default reviewsReducer;