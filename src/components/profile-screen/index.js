import React, {useState, useRef, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "../../contexts/user-context";
import {findUserById, profile} from "../../services/user-services";
import Favorite from "../home-screen/favorite";
import {findAllReviewsByUser} from "../../services/reviews-services";
import Reviews from "../details-screen/reviews";
import RecentActivityReview from "../home-screen/recent-activity-review";
import Review from "./review";

const ProfileScreen = () => {
  const {user, checkLoggedIn, loggedIn} = useUser();
  const {id} = useParams();
  const [profileUser, setProfileUser] = useState(user);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const user = await findUserById(id);
      setProfileUser(user[0]);
    } catch (e) {
      alert("User profile is invalid.");
    }
  }

  const loadUserReviews = async () => {
    let userReviews;
    if (id) {
      userReviews = await findAllReviewsByUser(id);
    } else {
      userReviews = await findAllReviewsByUser(user._id)
    }
    setReviews(userReviews.reverse());
  }

  useEffect(() => {
    checkLoggedIn();

    if (id) {
      getUser();
    }

    loadUserReviews();

    if (!id && !loggedIn) {
      //navigate(`/login`);
    }
  }, []);

  return(
    <>
      <h1 className="mb-5">{(id ? profileUser.firstName + " " + profileUser.lastName + "'s " : "") + "Profile"}</h1>
      <div className="row">
        {loggedIn && !id &&
        <div className="col-6">
          <h2>User Information</h2>
          <div>
            <label className="form-label">First Name:
              <input className="form-control"
                     type="text"
                     disabled={!loggedIn}
                     value={profileUser.firstName || user.firstName}>
              </input>
            </label>
          </div>

          <div>
            <label className="form-label">Last Name:
              <input className="form-control"
                     type="text"
                     disabled={!loggedIn}
                     value={profileUser.lastName || user.lastName}>
              </input>
            </label>
          </div>

          <div>
            <div>
              <label className="form-label">Email:
                <input className="form-control"
                       type="text"
                       disabled={true}
                       value={profileUser.email || user.email}>
                </input>
              </label>
            </div>

            <div>
              <label className="form-label">Password:
                <input className="form-control"
                       type="password"
                       disabled={true}
                       value={profileUser.password || user.password}>
                </input>
              </label>
            </div>

            <div>
              <label className="form-label">New Password:
                <input className="form-control"
                       type="password"
                       >
                </input>
              </label>
            </div>

            <div>
              <label className="form-label">Confirm Password:
                <input className="form-control"
                       type="password">
                </input>
              </label>
            </div>
          </div>
        </div>}

        <div className="col-6">
          <h2>Favorite Restaurants</h2>
          <div className="wd-height-200 overflow-scroll">
          {profileUser.favorites && profileUser.favorites?.map((fave) => {
            return <Favorite fave={fave}/>
          })}
          {!profileUser.favorites && user.favorites?.map((fave) => {
            return <Favorite fave={fave}/>
          })}
          </div>

          <h2 className="mt-3">Reviews</h2>
          <div className="wd-height-200 overflow-scroll">
            {reviews.map((review) => {
              return <Review review={review}/>
              })}
          </div>

        </div>
      </div>
    </>
  );
}

export default ProfileScreen;