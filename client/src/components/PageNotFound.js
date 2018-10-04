import React from "react";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <h2>Page Not Found 404 !</h2>
      <br />
      <NavLink
        to="/myshift"
        activeStyle={{
          fontWeight: "bold",
          color: "red"
        }}
      >
        Click to go back
      </NavLink>
    </div>
  );
};

export default PageNotFound;
