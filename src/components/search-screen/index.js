import React, {useRef, useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";
import {getBusinessesByTermAndLocation} from "../../services/yelp-services";

const SearchScreen = () => {
  const [businesses, setBusinesses] = useState([]);
  const {term, location} = useParams();
  const termRef = useRef();
  const locationRef = useRef();

  const searchBusinessesByTermAndLocation = async () => {
    const search = {term: termRef.current.value, location: locationRef.current.value};
    const results = await getBusinessesByTermAndLocation(search);
    setBusinesses(results.businesses);
  }

  useEffect(() => {
    termRef.current.value = term;
    locationRef.current.value = location;
    searchBusinessesByTermAndLocation();
  }, []);

  return(
    <>
      <div class="form-group">
        <label for="search">Search</label>
        <input type="text" class="form-control" id="search" ref={termRef} placeholder="Search for businesses"/>
      </div>
      <div class="form-group">
        <label for="search">Location</label>
        <input type="text" class="form-control" id="location" ref={locationRef} placeholder="Location"/>
      </div>
      <button type="submit" class="btn btn-primary" onClick={searchBusinessesByTermAndLocation}>Submit</button>

      <ul className="list-group">
        {
          businesses.map((business) => {
            return(
              <li className="list-group-item" key={business.id}>
                <Link to={`/search/details/${business.id}`}>
                  {JSON.stringify(business.name)}
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