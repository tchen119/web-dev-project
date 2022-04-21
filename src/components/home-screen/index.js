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
    <div className="row">
      <div className="col-8">
        <Explore/>
      </div>
      {loggedIn &&
      <div className="col-4">
        <Favorites/>
        <RecentActivity/>
      </div> }
    </div>
  );
}

export default HomeScreen;