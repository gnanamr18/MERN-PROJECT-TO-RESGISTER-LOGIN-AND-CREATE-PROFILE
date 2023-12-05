import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "../../actions/profileService";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import Profile from "../profiles/Profile";
import { addAlert } from "../../reducers/alertSlice";
import { Logout } from "../../reducers/profileSlice";
import CreateProfile from "../profiles/CreateProfile";
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
    dispatch(getProfile({ jwtToken }));
    console.log("hi");
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    navigate("/createprofile");
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
        <p className="container">
          <strong>click here to view your profile</strong>
        </p>
        <button
          className="cbn"
          onClick={(e) => {
            handleGetProfile(e);
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
        <p className="container">
          {" "}
          <strong>click here to create your profile</strong>
        </p>
        <button
          className="cbn"
          onClick={(e) => {
            handleCreateProfile(e);
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
