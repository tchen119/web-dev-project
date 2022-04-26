import React, {useRef, useState, useEffect} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {getBusinessesByTermAndLocation} from "../../services/yelp-services";

const SearchScreen = () => {
  const [businesses, setBusinesses] = useState([]);
  const {term, location} = useParams();
  const termRef = useRef();
  const locationRef = useRef();
  const navigate = useNavigate();

  const searchBusinessesByTermAndLocation = async () => {
    const search = {term: termRef.current.value, location: locationRef.current.value};
    const results = await getBusinessesByTermAndLocation(search);
    setBusinesses(results.businesses);
    navigate(`/search/${termRef.current.value}/${locationRef.current.value}`);
  }

  useEffect(() => {
    if (term && location) {
      termRef.current.value = term;
      locationRef.current.value = location;
      searchBusinessesByTermAndLocation();
    }
  }, []);

  return(
    <>
      <center>
        <div className="wd-form-border bg-white shadow">
          <div className="form-group wd-padding">
            <label for="search">Search</label>
            <input type="text" className="form-control" id="search" ref={termRef} placeholder="Search for businesses"/>
          </div>
          <div className="form-group wd-padding">
            <label for="search">Location</label>
            <input type="text" className="form-control" id="location" ref={locationRef} placeholder="Location"/>
          </div>
          <button type="submit" className="btn wd-background" onClick={searchBusinessesByTermAndLocation}>Submit</button>
        </div>
      </center>

      <ul className="list-group shadow rounded">
        {
          businesses.map((business) => {
            return(
              <li className="list-group-item" key={business.id}>
                <Link to={`/search/details/${business.id}`} style={{textDecoration: 'none'}}>
                  <div className="text-dark wd-padding">
                    <h5 className="wd-bold">{business.name}</h5>
                    <img className="wd-small-image" src={business.image_url}/>
                    <p>{business.price}</p>
                    {business.categories && business.categories.map((category) => {
                      return(
                        <div className="wd-new-line">
                          <span className="wd-label bg-warning">{category.title}</span>
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

export default SearchScreen;