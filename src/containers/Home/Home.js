import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
// import Operations from "./Operations/Operations";
import { withRouter } from "react-router-dom";
import classes from "./Home.module.css";
import Directories from "./Directories/Directories";
import Directory from "./Directories/Directory/Directory";
import Modal from "../../components/Modal/Modal";
const Home = (props) => {
  const [slideState, setSlideState] = useState(false);
  const [touchedPlus, setTouchedPlus] = useState(false);
  const [directories, setDirectories] = useState([]);
  const [enteredDirectoryName, setEnteredDirectoryName] = useState("");
  const [showModal,setShowModal]=useState(true);

  const handleSlider = () => {
    setSlideState(!slideState);
    setTouchedPlus(true);
  };

  const modalDisplayHandler = ()=>{
    setShowModal(!showModal);
  }

  const addDirectoryHandler = () => {
    setDirectories((currentDirectories) => [
      ...currentDirectories,
      { id: enteredDirectoryName, value: enteredDirectoryName },
    ]);
    setEnteredDirectoryName("");
    console.log(directories);
  };

  const removeDirectortyHandler = (directoryId) => {
    console.log(directoryId);
    setDirectories((currentDirectories) => {
      return currentDirectories.filter(
        (directory) => directory.id !== directoryId
      );
    });
    console.log(directories);
  };
  const directoryNameInputHandler = (e) => {
    e.preventDefault();
    const enteredName = e.target.value;
    setEnteredDirectoryName(enteredName);
  };

  return (
    <Dashboard title="Home">
      <div className={classes.home_container}>
        <div className={classes.plus_container}>
          <span onClick={handleSlider}>{slideState ? "-" : "+"}</span>
        </div>
        {/* {showModal&& <Modal> */}
      <div className={classes.operations_container}>
        <input
          type="text"
          value={enteredDirectoryName}
          onChange={(e) => directoryNameInputHandler(e)}
        />
        <input type="submit" value="ADD" onClick={addDirectoryHandler} />
      </div>
      {/* </Modal>} */}
        <Directories>
        {directories.map((directory)=>
          <Directory key={directory.id} removeDirectortyHandler={removeDirectortyHandler} directory={directory}/>                 
         ) }
        </Directories>
      </div>
    </Dashboard>
  );
};
export default withRouter(Home);
