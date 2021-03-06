import React, {useRef, useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import {getBusinessDetails} from "../../services/yelp-services";
import {findAllReviews} from "../../services/reviews-services";
import {findAllLikes} from "../../services/likes-services";
import Likes from './likes';
import Reviews from './reviews';
import '../../index.css';
import {useUser} from "../../contexts/user-context";

const DetailsScreen = () => {
  const [businessDetails, setBusinessDetails] = useState({});
  const [reviews, setReviews] = useState({});
  const [likes, setLikes] = useState({});
  const {id} = useParams();
  const {user, checkLoggedIn} = useUser();

  const fetchBusinessDetails = async () => {
    const results = await getBusinessDetails(id);
    setBusinessDetails(results);
  }

  const fetchBusinessReviews = async () => {
    const results = await findAllReviews(id, businessDetails.name);
    setReviews(results);
  }

  const fetchBusinessLikes = async () => {
    const results = await findAllLikes(id);
    setLikes(results);
  }

  useEffect(() => {
    fetchBusinessDetails();
    fetchBusinessReviews();
    fetchBusinessLikes();
    checkLoggedIn();
  }, []);

  return(
    <>
      <h1 className="wd-center wd-font">{businessDetails.name}</h1>

      <div className="container wd-width-75">
        <div className="row">
          <div className="col-sm-12 col-md-4 wd-height-250">
            <img className="wd-fill-image rounded shadow-lg" src={businessDetails.photos ? businessDetails.photos[0] : ""}/>
          </div>
          <div className="col-sm-12 col-md-4 wd-height-250">
            <img className="wd-fill-image rounded shadow-lg" src={businessDetails.photos ? businessDetails.photos[1] : ""}/>
          </div>
          <div className="col-sm-12 col-md-4 wd-height-250">
            <img className="wd-fill-image rounded shadow-lg" src={businessDetails.photos ? businessDetails.photos[2] : ""}/>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="wd-padding col-sm-12 col-md-6">
            <div className="card shadow">
              <div class="card-header wd-center wd-font">
                Details
              </div>
              <div class="card-body">
                <p class="card-text">
                  Tags: &nbsp;
                  {businessDetails.categories && businessDetails.categories.map((category) => {
                    return(
                      <>
                        <span className="wd-label bg-warning">{category.title}</span>
                        &nbsp;
                      </>
                    );
                  })}
                </p>
                <p class="card-text">Rating: {businessDetails.rating} </p>
                <p class="card-text">Price: {businessDetails.price} </p>
                <p class="card-text">Phone: {businessDetails.display_phone}</p>
                <p class="card-text">Status: {businessDetails.hours && businessDetails.hours.is_open_now ? "Open" : "Closed"} </p>
                <p class="card-text">Location: {businessDetails.location ? businessDetails.location.display_address : ""} </p>
              </div>
            </div>
            <div className="wd-center wd-padding">
              <Likes businessLikes={likes} bid={id} bName={businessDetails.name}/>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="wd-center">
              <Reviews businessReviews={reviews} bid={businessDetails.id} bName={businessDetails.name}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsScreen;