import React, { useEffect, useState } from "react";
import "./Register.scss";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { registerNewUser } from "../../services/userService";

require("dotenv").config();

function Register(props) {
  const URL = process.env.URL_BACKEND;
  console.log("URL: ", URL);
  const router = useHistory();

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidUsername: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };

  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const isValidInputs = () => {
    if (!email) {
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      toast.error("Email is required");
      return false;
    }

    let regx = /^\S+@\S+\.\S+$/;
    if (!regx.test(email)) {
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!phoneNumber) {
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
      toast.error("Phone number is required");
      return false;
    }
    if (!username) {
      setObjCheckInput({ ...defaultValidInput, isValidUsername: false });
      toast.error("Username is required");
      return false;
    }
    if (!password) {
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      toast.error("Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
      toast.error("Password and Re-enter password doesn't match");
      return false;
    }
    if (password.length < 6) {
      setObjCheckInput({
        ...defaultValidInput,
        isValidConfirmPassword: false,
      });
      toast.error("Password must be greater than 8 character");
      return false;
    }
    return true;
  };

  useEffect(() => {}, []);
  const handleRegister = async () => {
    let check = isValidInputs();
    if (check) {
      let res = await registerNewUser(email, phoneNumber, username, password);
      let serverData = res.data;
      console.log("serverData: ", serverData);
      if (+serverData.errorCode === 0) {
        toast.success("register successfully!");
        router.push("/login");
      }
      if (+serverData.errorCode === 1) {
        toast.error("Email or Phone number is already exist!");
      }
      if (+serverData.errorCode === -2) {
        toast.error("Something wrongs in service");
      }
    }
  };

  return (
    <div className="register-container mx-auto pt-3">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left red col-12  col-sm-7 d-none  d-sm-block  ">
            <div className="d-flex flex-column justify-content-center align-items-center  h-50">
              <div className="brand">Sony Academy</div>
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
                className={
                  objCheckInput.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Phone number :</label>
              <input
                type="text"
                className={
                  objCheckInput.isValidPhone
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                placeholder="Phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Username :</label>
              <input
                type="text"
                className={
                  objCheckInput.isValidUsername
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Password :</label>
              <input
                type="password"
                className={
                  objCheckInput.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Re-enter password :</label>
              <input
                type="password"
                className={
                  objCheckInput.isValidConfirmPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
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
              <a href="/#" className="forgot-pass">
                Already have an account!
              </a>
            </span>
            <hr />
            <div className="text-center">
              <Link to="/login">
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
