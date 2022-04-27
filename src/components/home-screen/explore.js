import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getBusinessesByTermAndLocation} from "../../services/yelp-services";

const Explore = () => {
  const [businesses, setBusinesses] = useState([]);
  const termRef = useRef("food");
  const locationRef = useRef("boston");

  const completeSearch = async() => {
    const search = {
      term: termRef.current,
      location: locationRef.current
    };
    const results = await getBusinessesByTermAndLocation(search);
    setBusinesses(results.businesses);
  }

  useEffect(() => {
    completeSearch();
  })

  return (
      <div className="card my-4">
        <h1 className="card-header">Explore</h1>
        <ul className="list-group shadow m-0 p-0">
          {
            businesses.map((business) => {
              return (
                  <li className="list-group-item" key={business.id}>
                    <Link to={`/search/details/${business.id}`}
                          style={{textDecoration: 'none'}}>
                      <div className="text-dark wd-padding">
                        <h5 className="wd-bold">{business.name}</h5>
                        <img className="wd-small-image"
                             src={business.image_url}/>
                        <p>{business.price}</p>
                        {business.categories && business.categories.map(
                            (category) => {
                              return (
                                  <div className="wd-new-line">
                                    <span
                                        className="wd-label bg-warning">{category.title}</span>
                                  </div>
                              );
                            })}
                      </div>
                    </Link>
                  </li>
              );
            })
          }
        </ul>
      </div>
  );
}

export default Explore;