import React, { Fragment, useState } from "react";
import { registerProfile } from "../../actions/profileService";
import { useDispatch, useSelector } from "react-redux";

const CreateProfile = () => {
  const dispatch = useDispatch();
  const jwtToken = useSelector((state) => state.auth.userToken);
  const regProfile = useSelector((state) => state.profile.regProfile);
  //   console.log(jwtToken);
  const [form, setform] = useState({
    company: "",
    location: " ",
    status: "",
    skills: "",
    github: "",
  });

  const { company, location, status, skills, github } = form;
  const onchange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    if (!regProfile) {
      dispatch(
        registerProfile({ jwtToken, company, location, status, skills, github })
      );
    }
  };

  return (
    <div>
      <Fragment>
        <form className="container" onSubmit={(e) => onsubmit(e)}>
          <div>
            <label>
              <strong>Enter your company name:</strong>
            </label>
            <input
              type="text"
              placeholder="enter your company name"
              name="company"
              value={company}
              onChange={(e) => onchange(e)}
              required
            />
          </div>
          <div>
            <label>
              <strong>Enter your Location:</strong>
            </label>
            <input
              type="text"
              placeholder="enter your Location"
              name="location"
              value={location}
              onChange={(e) => onchange(e)}
              required
            />
          </div>
          <div>
            <label>
              <strong>Enter your Status:</strong>
            </label>
            <input
              type="text"
              placeholder="enter your Status"
              name="status"
              value={status}
              onChange={(e) => onchange(e)}
              required
            />
          </div>
          <div>
            <label>
              <strong>Enter your Skills:</strong>
            </label>
            <input
              type="text"
              placeholder="enter your Skills"
              name="skills"
              value={skills}
              onChange={(e) => onchange(e)}
              required
            />
          </div>
          <div>
            <label>
              <strong>Enter your Github:</strong>
            </label>
            <input
              type="text"
              placeholder="enter your Github"
              name="github"
              value={github}
              onChange={(e) => onchange(e)}
              required
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </Fragment>
    </div>
  );
};

export default CreateProfile;
