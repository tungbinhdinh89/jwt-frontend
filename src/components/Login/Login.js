import React, { useEffect, useState } from "react";
import "./Login.scss";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";

function Login(props) {
  const router = useHistory();
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");

  const defaultValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };

  const [objValidInput, setObjValueInput] = useState(defaultValidInput);

  const handleLogin = async () => {
    if (!valueLogin) {
      setObjValueInput({ ...defaultValidInput, isValidValueLogin: false });
      toast.error("Please enter your email address or phone number");
      return;
    }
    if (!password) {
      setObjValueInput({ ...defaultValidInput, isValidPassword: false });
      toast.error("Password field is required!");
      return;
    }
    let res = await loginUser(valueLogin, password);
    if (res && +res.errorCode === 0) {
      // success
      let data = {
        isAuthenticated: true,
        token: "fake token",
      };
      sessionStorage.setItem("account", JSON.stringify(data));
      router.push("/users");
      // window.location.reload();
      toast.success(res.errorMessage);
    }

    if (res && +res.errorCode !== 0) {
      toast.error(res.errorMessage);
    }
    console.log("check res:", res);
    console.log("🚀 ~ res.errorCode:", res.errorCode);
  };

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      router.push("/");
    }
  }, [router]);
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
              className={
                objValidInput.isValidValueLogin
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="Email address or your phone number"
              value={valueLogin}
              onChange={(event) => setValueLogin(event.target.value)}
            />
            <input
              type="password"
              className={
                objValidInput.isValidPassword
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="Your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
            <span className="text-center">
              <a href="/#" className="forgot-pass">
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
