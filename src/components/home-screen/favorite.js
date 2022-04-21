import React, {useEffect, useState} from "react";
import {getBusinessDetails} from "../../services/yelp-services";
import {Link} from "react-router-dom";

const Favorite = ({fave}) => {
  const [businessDetails, setBusinessDetails] = useState({});

  const fetchBusinessDetails = async () => {
    const results = await getBusinessDetails(fave);
    setBusinessDetails(results);
  }

  useEffect(() => {
    fetchBusinessDetails();
  }, [])

  return(
      <>
        <li className="list-group-item" key={businessDetails.id}>
          <Link to={`/search/details/${businessDetails.id}`} style={{textDecoration: 'none'}}>
            <div className="text-dark wd-padding">
              <h5 className="wd-bold">{businessDetails.name}</h5>
              <img className="wd-small-image" src={businessDetails.image_url}/>
              <p>{businessDetails.price}</p>
              {businessDetails.categories && businessDetails.categories.map((category) => {
                return(
                    <div className="wd-new-line">
                      <span className="wd-label bg-warning">{category.title}</span>
                    </div>
                );
              })}
            </div>
          </Link>
        </li>
      </>
  );
}

export default Favorite;