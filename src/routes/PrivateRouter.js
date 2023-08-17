import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function PrivateRouter(props) {
  const router = useHistory();
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Route path={props.path} component={props.component} />
    </>
  );
}

export default PrivateRouter;
