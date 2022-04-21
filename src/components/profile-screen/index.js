import React, {useState, useRef, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "../../contexts/user-context";
import {findUserById} from "../../services/user-services";

const ProfileScreen = () => {
  const {user, checkLoggedIn, loggedIn} = useUser();
  const {id} = useParams();
  const [profileUser, setProfileUser] = useState(user);
  const navigate = useNavigate();

  useEffect(() => {
    checkLoggedIn();

    if (id) {
      getUser();
    }

    if (!id && !loggedIn) {
      //navigate(`/login`);
    }
  }, []);

  const getUser = async () => {
    try {
      const user = await findUserById(id);
      setProfileUser(user[0]);
    } catch (e) {
    }
  }

  return(
    <>
      <h1>Profile</h1>
      <div>
        <label className="form-label">First Name:
          <input className="form-control"
                 type="text"
                 disabled={!loggedIn}
                 value={profileUser.firstName || user.firstName}>
          </input>
        </label>
      </div>

      <div>
        <label className="form-label">Last Name:
          <input className="form-control"
                 type="text"
                 disabled={!loggedIn}
                 value={profileUser.lastName || user.lastName}>
          </input>
        </label>
      </div>


      {loggedIn && !id &&
      <div>
        <div>
          <label className="form-label">Email:
            <input className="form-control"
                   type="text"
                   disabled={true}
                   value={profileUser.email || user.email}>
            </input>
          </label>
        </div>

        <div>
          <label className="form-label">Password:
            <input className="form-control"
                   type="password"
                   disabled={true}
                   value={profileUser.password || user.password}>
            </input>
          </label>
        </div>

        <div>
          <label className="form-label">New Password:
            <input className="form-control"
                   type="password"
                   >
            </input>
          </label>
        </div>

        <div>
          <label className="form-label">Confirm Password:
            <input className="form-control"
                   type="password">
            </input>
          </label>
        </div>

        <div>
          <label className="col-11 form-label">Admin
            <input className="form-check-inline ms-2"
                   type="checkbox"
                   disabled={true}
                   value={profileUser.admin || user.admin}>
            </input>
          </label>
        </div>
      </div>}
    </>
  );
}

export default ProfileScreen;