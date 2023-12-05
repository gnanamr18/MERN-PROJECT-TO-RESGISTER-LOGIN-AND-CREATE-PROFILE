import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const profile = useSelector((state) => state.profile.profiles);

  const renderProfileDetails = () => {
    const { name } = profile.user;
    const { company, location, status, skills, github } = profile;

    return (
      <div className="profile-details">
        <div>
          <strong>Name:</strong> {name}
        </div>
        <div>
          <strong>company:</strong> {company}
        </div>
        <div>
          <strong>location:</strong> {location}
        </div>
        <div>
          <strong>status:</strong> {status}
        </div>
        <div>
          <strong>skills:</strong> {skills ? skills.join(", ") : "No skills"}
        </div>
        <div>
          <strong>gitHub Username:</strong> {github}
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
