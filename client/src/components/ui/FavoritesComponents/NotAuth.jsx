import React from "react";

import { CustomLink } from "../index";

import { not_auth_fav } from "../../../assets/index";

const NotAuth = () => {
  return (
    <div className="go-login">
      <CustomLink to={"/login"}>At first you need to login</CustomLink>
      <img src={not_auth_fav} />
    </div>
  );
};

export default NotAuth;
