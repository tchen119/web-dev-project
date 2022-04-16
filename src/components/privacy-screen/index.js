import React from "react";
import '../../index.css';

const PrivacyScreen = () => {
  return(
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 wd-center wd-padding">Privacy Policy</h1>

          <p className="lead">The following page outlines how this website collects and uses information about visitors to
          the page. By using this website, you acknowledge that you consent to these practices.</p>
          <hr className="my-4"/>
          <h5 className="display-10">Your Profile Information</h5>
          <p className="lead">When you sign up for an account, you provide us with some basic information that is stored
          in our databases.</p>

          <h5 className="display-10">Search Information</h5>
          <p className="lead">When you search for businesses through our website, we collect this data to help provide the
          best experience for our visitors.</p>

          <h5 className="display-10">Other Information</h5>
          <p className="lead">We also keep information regarding the likes and reviews you provide to help enrich our
          databases.</p>
        </div>
      </div>
    </>
  );
}

export default PrivacyScreen;