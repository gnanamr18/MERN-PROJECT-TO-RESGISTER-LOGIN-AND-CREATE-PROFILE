import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "../../actions/profileService";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import Profile from "../profiles/Profile";
import { addAlert } from "../../reducers/alertSlice";
import { Logout } from "../../reducers/profileSlice";
const Dashboard = () => {
  // useEffect(() => {
  //   const jwtToken = useSelector(state.auth.userToken);
  // }, [state.auth.userToken]);
  const navigate = useNavigate();
  const jwtToken = useSelector((state) => state.auth.userToken);
  const loading = useSelector((state) => state.profile.loading);
  const isProfile = useSelector((state) => state.profile.isProfile);
  // console.log(profile);

  const dispatch = useDispatch();
  const handleGetProfile = async (e) => {
    e.preventDefault();
    if (loading) {
      dispatch(getProfile({ jwtToken }));
    }
  };

  useEffect(() => {
    if (isProfile === true) {
      navigate("/profile");
    }

    if (isProfile === false) {
      dispatch(addAlert("you dont have a profile create one"));
    }
  }, [isProfile]);

  const profileLink = (
    <div>
      <div>
        <p className="container">click here to view your profile</p>
        <button
          className="container"
          onClick={(e) => {
            handleGetProfile(e);
            dispatch(Logout());
          }}
        >
          click here
        </button>
      </div>
    </div>
  );

  const noProfileLink = (
    <div>
      <div>
        <p className="container">click here to create your profile</p>
        <button
          className="container"
          onClick={(e) => {
            // handleCreateProfile(e);
          }}
        >
          click here
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {isProfile === undefined
        ? profileLink
        : isProfile === false
        ? noProfileLink
        : null}
    </div>
  );
};

export default Dashboard;
