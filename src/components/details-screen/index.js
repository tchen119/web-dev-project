import React, {useRef, useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import {getBusinessDetails} from "../../services/yelp-services";
import {findAllReviews} from "../../services/reviews-services";
import Likes from './likes';
import Reviews from './reviews';
import '../../index.css';

const DetailsScreen = () => {
  const [businessDetails, setBusinessDetails] = useState({});
  const [reviews, setReviews] = useState({});
  const {id} = useParams();

  const fetchBusinessDetails = async () => {
    const results = await getBusinessDetails(id);
    setBusinessDetails(results);
  }

  const fetchBusinessReviews = async () => {
    const results = await findAllReviews(id);
    setReviews(results);
    console.log(results);
  }

  useEffect(() => {
    fetchBusinessDetails();
    fetchBusinessReviews();
  }, []);

  return(
    <>
      <h1>{businessDetails.name}</h1>
      <img src={businessDetails.image_url} className="wd-medium-image"/>
      <h2> Phone: {businessDetails.phone} </h2>
      <h2> Rating: {businessDetails.rating} </h2>

      <Likes/>
      <Reviews businessReviews={reviews} bid={businessDetails.id}/>
    </>
  );
}

export default DetailsScreen;