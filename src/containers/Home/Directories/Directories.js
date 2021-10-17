import React, { useState } from "react";
import classes from "./Directories.module.css";



const Directories = (props) => {
  return (
      <div className={classes.directory_container}>
        {props.children}
      </div>
  );
};
export default Directories;
