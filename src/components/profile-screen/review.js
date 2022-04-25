import React from 'react';

const Review = ({review}) => {
  console.log(review)

  return(
      <li className="list-group-item">
        <p className="wd-bold wd-left">{review.business_name}</p>
        <p>{review.review}</p>

      </li>
  );
}

export default Review;