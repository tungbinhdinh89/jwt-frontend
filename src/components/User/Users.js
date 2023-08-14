import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";

function Users() {
  const router = useHistory();
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      router.push("/login");
    }
  }, []);
  return <div>Users</div>;
}

export default Users;
