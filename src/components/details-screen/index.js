import React, {useRef, useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import {getBusinessDetails} from "../../services/yelp-services";

const DetailsScreen = () => {
  const [businessDetails, setBusinessDetails] = useState({});
  const {id} = useParams();

  const fetchBusinessDetails = async () => {
    const results = await getBusinessDetails(id);
    setBusinessDetails(results);
  }

  useEffect(() => {
    fetchBusinessDetails();
  }, []);

  return(
    <>
      <h1>{businessDetails.name}</h1>
      <h2> Phone: {businessDetails.phone} </h2>
      <h2> Rating: {businessDetails.rating} </h2>
      <img src={businessDetails.image_url}/>
    </>
  );
}

export default DetailsScreen;