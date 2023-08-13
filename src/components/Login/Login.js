import React, { useEffect } from "react";
import "./Login.scss";
import { Link } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";

function Login(props) {
  return (
    <div className="login-container pt-3">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left red col-12  col-sm-6 d-none  d-sm-block pt-5 pb-3 text-center">
            <div className="brand">Sony Academy</div>
            <div className="detail">Learning everything...</div>
          </div>
          <div className="content-right yellow col-12 col-sm-6 mx-3 mx-auto d-flex flex-column gap-3 py-3 ">
            <div className="brand text-uppercase fs-4 text-center fw-bolder font-monospace text-primary d-sm-none d-block">
              Sony Academy
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Email address or your phone number"
            />
            <input
              type="password"
              className="form-control"
              placeholder="Your password"
            />
            <button className="btn btn-primary">Login</button>
            <span className="text-center">
              <a href="#" className="forgot-pass">
                Forgot your password?
              </a>
            </span>
            <hr />
            <div className="text-center">
              <Link to="/register">
                <button className="btn btn-success">
                  Create new a account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
