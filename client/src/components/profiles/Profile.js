import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const profile = useSelector((state) => state.profile.profiles);

  const renderProfileDetails = () => {
    const { name } = profile.user;
    const { company, location, status, skills, githubusername } = profile;

    return (
      <div className="profile-details">
        <div>
          <strong>Name:</strong> {name}
        </div>
        <div>
          <strong>Company:</strong> {company}
        </div>
        <div>
          <strong>Location:</strong> {location}
        </div>
        <div>
          <strong>Status:</strong> {status}
        </div>
        <div>
          <strong>Skills:</strong> {skills ? skills.join(", ") : "No skills"}
        </div>
        <div>
          <strong>GitHub Username:</strong> {githubusername}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Profile Details</h1>
      {renderProfileDetails()}
    </div>
  );
};

export default Profile;
