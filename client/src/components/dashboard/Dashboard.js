import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "../../actions/profileService";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import Profile from "../profiles/Profile";
import { addAlert } from "../../reducers/alertSlice";
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
    if (isProfile) {
      navigate("/profile");
    } else {
      dispatch(addAlert("you dont have a profile create one"));
    }
  };

  return (
    <div>
      <h2 className="container">don't have a profile create one</h2>
      <p className="container">click here to view your profile</p>
      <button
        className="container"
        onClick={(e) => {
          handleGetProfile(e);
        }}
      >
        click here
      </button>
    </div>
  );
};

export default Dashboard;
