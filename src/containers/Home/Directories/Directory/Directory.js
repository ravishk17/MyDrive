import React from "react";
import folderIcon from "./folder.png";
import classes from "./Directory.module.css";

const Directory = props =>{
    return(
        <div
            key={props.directory.id}
            className={classes.directory}
            onClick={() => props.removeDirectortyHandler(props.directory.id)}
          >
            <div className={classes.folder_icon_container}>
              <img src={folderIcon} alt="Folder" />
            </div>
            <div className={classes.folder_name_container}>
              <span>{props.directory.value}</span>
            </div>
          </div>
    )
}
export default Directory;