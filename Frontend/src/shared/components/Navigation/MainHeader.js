import React from "react";

import "./MainHeader.css";

function MainHeader(props) {
  return <header className="main-header">{props.children}</header>;
}

export default MainHeader;

//props.children is used to render all the content provide with props
