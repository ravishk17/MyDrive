import React from "react";
import Aux from "../../hoc/Auxy";
const layout = (props) => {
  const preventDefault = (e) => {
    e.preventDefault();
  };
  return (
    <Aux>
      <main onClick={preventDefault}>{props.children}</main>
    </Aux>
  );
};
export default layout;
