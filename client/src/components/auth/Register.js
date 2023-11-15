// import axios from "axios";
// import { json } from "express";
import React, { Fragment, useState } from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { SetAlert } from "../../actions/alert";
import PropTypes from 'prop-types';
import {Alert} from '../../components/layout/Alert';

const Register = (Props) => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const onchange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(name);

  const onsubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      Props.SetAlert("password do not match", 'danger');
    } else {console.log('success')}
    //   const newUser = {
    //     name,
    //     email,
    //     password,
    //   };
    //   // console.log(formData)

    //   try {
    //     const config = {
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //     };
    //     const body = JSON.stringify(newUser);
    //     const res = await axios.post("http://localhost:5000/api/users", body, config);
    //     console.log(res.data);
    //   } catch (error) {
    //     console.error(error.message);
    //   }
    // }
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
            onChange={(e) => onchange(e)}
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

Register.propTypes = {
  SetAlert: PropTypes.func.isRequired
}

export default connect(null, {SetAlert}) (Register);
