import React from 'react';
import {Link} from "react-router-dom";

const Review = ({review}) => {
  return(
      <li className="list-group-item">
        <Link className="wd-bold wd-left text-decoration-none wd-blue" to={"/search/details/" + review.business_id}>{review.business_name}</Link>
        <p>{review.review}</p>
      </li>
  );
}

export default Review;