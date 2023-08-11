import React from "react";
import "./Login.scss";

function Login(props) {
  return (
    <div className="login-container mt-3">
      <div className="container">
        <div className="row">
          <div className="content-left red col-6">
            <div className="brand">Sony House</div>
            <div className="detail">Learning everything...</div>
          </div>
          <div className="content-right yellow col-6 d-flex flex-column gap-3 py-3">
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
            <span className="text-center">Forgot your password?</span>
            <hr />
            <div className="text-center">
              <button className="btn btn-success">Create new a account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
