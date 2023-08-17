import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

import Users from "../components/ManageUsers/Users";
import PrivateRouter from "./PrivateRouter";

function AppRoutes(props) {
  const Projects = () => {
    return <>Projects</>;
  };
  return (
    <>
      <Switch>
        {/* <Route path="/project">project</Route>
        <Route path="/users">
          <Users />
        </Route> */}
        <PrivateRouter path="/users" component={Users} />
        <PrivateRouter path="/projects" component={Projects} />

        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>

        <Route path="/" exact>
          Home
        </Route>
        <Route path="*"> 404 not found</Route>
      </Switch>
    </>
  );
}

export default AppRoutes;
