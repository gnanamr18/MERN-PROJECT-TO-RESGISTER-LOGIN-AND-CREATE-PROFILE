import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAlert } from "../../reducers/alertSlice";
import { registerUser } from "../../actions/authService";

const Register = (data) => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );

  if (success) {
    navigate("/login", dispatch(addAlert("user registered kindly login")));
  }

  const { name, email, password, password2 } = formData;
  const onchange = (e, t = null) => {
    // if (t) dispatch(updateName({ name: e.target.value }));
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(addAlert("password do not match"));
    } else {
      dispatch(registerUser({ name, email, password }));
      // console.log(userData);
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i class="fas fa-user"></i> Create Your Account
      </p>
      <form
        className="form"
        action="create-profile.html"
        onSubmit={(e) => {
          onsubmit(e);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onchange(e, "name")}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onchange(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onchange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onchange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
