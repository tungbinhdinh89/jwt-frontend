import React, { useState } from "react";
import "./Register.scss";
import { Link } from "react-router-dom/cjs/react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    let userData = { email, phoneNumber, username, password, confirmPassword };
    console.log("userData: ", userData);
  };

  return (
    <div className="register-container mx-auto pt-3">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left red col-12  col-sm-7 d-none  d-sm-block  ">
            <div className="d-flex flex-column justify-content-center align-items-center  h-50">
              <div className="brand">Sony House</div>
              <div className="detail">Learning everything...</div>
            </div>
          </div>
          <div className="content-right yellow col-12 col-sm-5 mx-3 mx-auto d-flex flex-column gap-3 py-3 ">
            <div className="brand text-uppercase fs-4 text-center fw-bolder font-monospace text-primary d-sm-none d-block">
              Sony House
            </div>
            <div className="form-group">
              <label htmlFor="">Email :</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Phone number :</label>
              <input
                type="text"
                className="form-control"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                placeholder="Phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Username :</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Password :</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Re-enter password :</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Re-enter password :"
              />
            </div>

            <button
              className="btn btn-success"
              onClick={() => {
                handleRegister();
              }}>
              Register
            </button>
            <span className="text-center">
              <a href="#" className="forgot-pass">
                Already have an account!
              </a>
            </span>
            <hr />
            <div className="text-center">
              <Link to="/register">
                <button className="btn btn-primary">Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
