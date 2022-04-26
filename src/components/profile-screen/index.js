import React, {useState, useRef, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "../../contexts/user-context";
import {findUserById, profile, updateUser} from "../../services/user-services";
import Favorite from "../home-screen/favorite";
import {findAllReviewsByUser} from "../../services/reviews-services";
import Review from "./review";
import {findAdmin} from "../../services/admin-services";
import NewReview from "./new-review";
import DeletedReview from "./deleted-review";

const ProfileScreen = () => {
  const {user, checkLoggedIn, loggedIn} = useUser();
  const {id} = useParams();
  const [profileUser, setProfileUser] = useState(user);
  const [reviews, setReviews] = useState([]);
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({});

  const updateProfile = async () => {
    if (!(passwordRef.current.value === confirmPasswordRef.current.value)) {
      alert("Please make sure new passwords match.");
    }

    if (passwordRef.current.value === confirmPasswordRef.current.value) {
      const password = passwordRef.current.value === '' ? user.password : passwordRef.current.value;

      const userObject = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: password,
      }

      const response = await updateUser(userObject);
      alert("Profile updated! Please take a moment to review our privacy statement.");
      navigate('/privacy');
    }
  }

  const getUser = async () => {
    try {
      const user = await findUserById(id);
      setProfileUser(user[0]);
    } catch (e) {
      alert("User profile is invalid.");
    }
  }

  const getAdmin = async () => {
    try {
      const admin = await findAdmin(user._id);
      setAdmin(admin[0]);
    } catch (e) {}
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
    } else {
      getAdmin();
    }


    loadUserReviews();
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
                     disabled={true}
                     value={profileUser.firstName || user.firstName}>
              </input>
            </label>
          </div>

          <div>
            <label className="form-label">Last Name:
              <input className="form-control"
                     type="text"
                     disabled={true}
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
                       ref={passwordRef}
                       type="password"
                       >
                </input>
              </label>
            </div>

            <div>
              <label className="form-label">Confirm New Password:
                <input className="form-control"
                       ref={confirmPasswordRef}
                       type="password">
                </input>
              </label>
            </div>
          </div>

          <button className="btn btn-primary" type="button" onClick={updateProfile}>Update Password</button>
        </div>}

        <div className="col-6">
          <h2>Favorite Restaurants</h2>
          <div className="wd-height-200 overflow-scroll">
          {profileUser.favorites && profileUser.favorites?.map((fave) => {
            return <Favorite fave={fave}/>
          })}
          {profileUser.favorites && profileUser.favorites.length === 0 ?
                <p>Liked restaurants will show up here!</p> : ""}
          </div>

          <h2 className="mt-3">Reviews</h2>
          <div className="wd-height-200 overflow-scroll">
            {reviews && reviews.map((review) => {
              return <Review review={review}/>
              })}
            {reviews && reviews.length === 0 ?
                <p>Reviewed restaurants will show up here!</p> : ""}
          </div>

          {user && user.admin &&
          <div>
            <h2 className="mt-3">Edited Reviews</h2>
            <div className="wd-height-200 overflow-scroll">
              {admin.updatedReviews && admin.updatedReviews.map((review) => {
                return <NewReview review={review}/>
              })}
              { admin.updatedReviews && admin.updatedReviews.length === 0 ?
                  <p>Review you edit will show up here!</p> : ""}
            </div>

            <h2 className="mt-3">Deleted Reviews</h2>
            <div className="wd-height-200 overflow-scroll">
              {admin.deletedReviews && admin.deletedReviews.map((review) => {
                return <DeletedReview review={review}/>
              })}
              {admin.deletedReviews && admin.deletedReviews.length === 0 ?
                  <p>Review you delete will show up here!</p> : ""}
            </div>
          </div>
          }
        </div>
      </div>
    </>
  );
}

export default ProfileScreen;