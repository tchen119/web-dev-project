import React from 'react';
import {Link} from "react-router-dom";

const NewReview = ({review}) => {
  const profileID = review.user_id;
  const businessID = review.business_id;

  return(
      <li className="list-group-item">
        <Link className="wd-bold wd-left text-decoration-none" to={"/profile/" + profileID}>{review.first_name + " "
        + review.last_name}</Link>
        <span className="wd-bold wd-left"> : </span>
        <Link className="wd-bold wd-left text-decoration-none" to={"/search/details/" + businessID}>{review.business_name}</Link>
        <p className="wd-bold wd-left mb-0"> used to say </p>
        <p className="wd-left mb-0">{review.old_review}</p>
        <p className="wd-bold wd-left mb-0"> says now </p>
        <p className="wd-left mb-0">{review.new_review}</p>
      </li>
  );
}

export default NewReview;