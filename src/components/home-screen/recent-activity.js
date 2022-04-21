import React, {useEffect, useState} from "react";
import {findRecentReviews} from '../../services/reviews-services';
import {getBusinessDetails} from "../../services/yelp-services";


const RecentActivity = () => {
  const [allReviews, setAllReviews] = useState([]);

  const loadReviews = async () => {
    let reviews = await findRecentReviews();
    reviews = reviews.slice(0, 10);
    for (let i = 0; i < 10; i += 1) {
      const business = await getBusinessDetails(reviews[i].business_id);
      reviews[i] = {review: reviews[i], business: business}
    }
    setAllReviews(reviews);
  }

  useEffect(() => {
    loadReviews();
  }, []);

  return(
      <>
        <h1>Recent Activity</h1>
        <h2>Likes</h2>
        <h2>Reviews</h2>
        <ul>
          {allReviews.map((review) =>
            <li className="list-group-item">
              <p className="wd-bold wd-left">{review.review.first_name + " " + review.review.last_name
              + " says about " + review.business.name}</p>
              <p className="wd-left">{review.review.review}</p>
            </li>
          )}
        </ul>
      </>
  );
}

export default RecentActivity;