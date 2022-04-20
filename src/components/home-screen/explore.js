import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getBusinessesByTermAndLocation} from "../../services/yelp-services";

const Explore = () => {
  const [businesses, setBusinesses] = useState([]);
  const termRef = useRef("food");
  const locationRef = useRef("boston");
  const navigate = useNavigate();

  const completeSearch = async() => {
    const search = {
      term: termRef.current,
      location: locationRef.current
    };
    const results = await getBusinessesByTermAndLocation(search);
    console.log(results)
    setBusinesses(results.businesses);
  }

  useEffect(() => {
    completeSearch();
  })

  return (
      <>
        <h1>Explore</h1>
        <ul className="list-group">
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
      </>
  );
}

export default Explore;