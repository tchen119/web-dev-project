import React, {useEffect, useState} from "react";
import {findRecentReviews} from '../../services/reviews-services';
import {findRecentLikes} from '../../services/likes-services';
import {getBusinessDetails} from "../../services/yelp-services";
import {Link} from "react-router-dom";
import {profile} from "../../services/user-services";

const RecentActivity = () => {
  const [allReviews, setAllReviews] = useState([]);
  const [allLikes, setAllLikes] = useState([]);

  const loadReviews = async () => {
    await findRecentReviews().then(response => {
      const start = response.length - 10;
      let reviews;
        if (start > 0) {
          reviews = response.slice(start).reverse();
        } else {
          reviews = response.slice(0).reverse();
        }
        setAllReviews(reviews);
      }
    );
  }

  const loadLikes = async () => {
    await findRecentLikes().then(response => {
          const start = response.length - 10;
          let likes;
          if (start > 0) {
            likes = response.slice(start).reverse();
          } else {
            likes = response.slice(0).reverse();
          }
          setAllLikes(likes);
        }
    );
  }

  useEffect(() => {
    loadLikes();
    loadReviews();
  }, []);

  return(
      <>
        <div className="row">
          <div className="col-md-6">
            <div className="card my-4">
              <h1 className="card-header">Recent Likes</h1>
              <ul className="m-0 p-0 wd-height-500 overflow-scroll">
                {allLikes.map((like) => {
                  const profileID = like.user_id;
                  const businessID = like.business_id;
                  return <li className="list-group-item">
                    <Link className="wd-bold wd-left text-decoration-none wd-blue" to={"/profile/" + profileID}>{like.first_name + " "
                    + like.last_name}</Link>
                    <span className="wd-bold wd-left"> likes </span>
                    <Link className="wd-bold wd-left text-decoration-none wd-blue" to={"/search/details/" + businessID}>{like.business_name}</Link>
                  </li>
                })}
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card my-4">
              <h1 className="card-header">Recent Reviews</h1>
              <ul className="m-0 p-0 wd-height-500 overflow-scroll">
                {allReviews.map((review) => {
                  const profileID = review.user_id;
                  const businessID = review.business_id;
                  return <li className="list-group-item">
                    <Link className="wd-bold wd-left text-decoration-none wd-blue" to={"/profile/" + profileID}>{review.first_name + " "
                    + review.last_name}</Link>
                    <span className="wd-bold wd-left"> says about </span>
                    <Link className="wd-bold wd-left text-decoration-none wd-blue" to={"/search/details/" + businessID}>{review.business_name}</Link>
                    <p className="wd-left">{review.review}</p>
                  </li>
                })}
              </ul>
            </div>
          </div>
        </div>
      </>
  );
}

export default RecentActivity;