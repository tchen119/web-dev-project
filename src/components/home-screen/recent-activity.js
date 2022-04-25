import React, {useEffect, useState} from "react";
import {findRecentReviews} from '../../services/reviews-services';
import {getBusinessDetails} from "../../services/yelp-services";
import {Link} from "react-router-dom";
import {profile} from "../../services/user-services";

const RecentActivity = () => {
  const [allReviews, setAllReviews] = useState([]);

  const loadReviews = async () => {
    await findRecentReviews().then(response => {
          let reviews = response.slice(0, 10);
          //reviews.map((review) => {
          //  const results = getBusinessDetails(review.business_id);
          //  review = {...review, results};
          //  return review;
         // });
          setAllReviews(reviews);
        }
    );
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
          {allReviews.map((review) => {
            const profileID = review.user_id;
            return <li className="list-group-item">
              <Link to={"/profile/" + profileID}>{review.first_name + " "
              + review.last_name}</Link>
              <p className="wd-bold wd-left">{"says about "
              }</p>
              <p className="wd-left">{review.review}</p>
            </li>
          })}
        </ul>
      </>
  );
}

export default RecentActivity;