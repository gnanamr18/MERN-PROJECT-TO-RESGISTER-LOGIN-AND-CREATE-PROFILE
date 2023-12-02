import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const profile = useSelector((state) => state.profile.profiles);

  const renderProfileDetails = (data) => {
    return (
      <ul className="profile-gird">
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong>{" "}
            {typeof value === "object" ? renderProfileDetails(value) : value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={"profile-gird"}>
      <h1>Profile Details</h1>
      {renderProfileDetails(profile)}
    </div>
  );
};

export default Profile;
