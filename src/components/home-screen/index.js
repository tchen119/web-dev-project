import React, {useEffect} from "react";
import Explore from "./explore";
import Favorites from "./favorites";
import RecentActivity from "./recent-activity";
import {useUser} from "../../contexts/user-context";

const HomeScreen = () => {
  const {user, checkLoggedIn, loggedIn} = useUser();

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return(
      <>
        <div className="row">
        {!loggedIn &&
        <div className="col-md-4">
          <Explore/>
        </div> }
        <div className="col-md-8">
          <RecentActivity/>
        </div>
        {loggedIn &&
        <div className="col-md-4">
          <Favorites/>
        </div> }
        </div>
      </>
  );
}

export default HomeScreen;