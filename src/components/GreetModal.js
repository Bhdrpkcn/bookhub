import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./greetModal.css";
import { setUserName, closeGreetModal } from "../redux/reducers/greetingReducer";
const GreetModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.greeting.userName);

  const handleSubmit = () => {
    const userNameInput = document.getElementById("userName").value.trim();

    if (userNameInput) {
      dispatch(setUserName(userNameInput));
      dispatch(closeGreetModal());

      onClose();
    } else {
      alert("User name cannot be empty!");
    }
  };

  const handleSkip = () => {
    dispatch(closeGreetModal());
  };

  return (
    <div className="greetModal">
      <div>{userName ? `Hello, ${userName}!` : "GreetModal"}</div>
      {!userName && (
        <div>
          <label htmlFor="userName">{userName}What is your name?</label>
          <input className="greetInput" type="text" id="userName" />
        </div>
      )}
      <div className="greetButtons">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleSkip}>Skip</button>
      </div>
    </div>
  );
};

export default GreetModal;
