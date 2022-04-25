import React, {useEffect, useState} from 'react';
import {getBusinessDetails} from "../../services/yelp-services";

const RecentActivityReview = ({ first_name, last_name, review, business_id }) => {
  //const [business, setBusiness] = useState({});

  const fetchBusinessDetails = async () => {
    console.log(first_name)
    //const business = await getBusinessDetails(business_id);
    //setBusiness(business);
  }

  useEffect(() => {
    fetchBusinessDetails();
  }, []);

  return(
      <li className="list-group-item">
        <p className="wd-bold wd-left">{first_name + " " + last_name + " says about " }</p>


      </li>
  );
}

export default RecentActivityReview;