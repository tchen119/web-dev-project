import React, {useRef, useState} from "react";
import {useParams, useEffect, Link} from "react-router-dom";
import axios from "axios";
import {getBusinessesByTermAndLocation} from "../../services/yelp-services";

const SearchScreen = () => {
  const [businesses, setBusinesses] = useState([]);
  //const {searchString} = useParams();
  const termRef = useRef();
  const locationRef = useRef();

  const searchBusinessesByTermAndLocation = async () => {
    const search = {term: termRef, location: locationRef};
    const results = getBusinessesByTermAndLocation(search);
    setBusinesses(results);
  }

//  useEffect(() => {
//    //termRef.current.value = searchString;
//    searchBusinessesByTermAndLocation();
//  }, []);

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

      {JSON.stringify(businesses)}

//      <ul className="list-group">
//        {
//          businesses.map(business =>
//            <li className="list-group-item">
//              <Link to={'/search/details/:id'}>
//                {business}
//              </Link>
//            </li>
//          )
//        }
//      </ul>
    </>
  );
}

export default SearchScreen;