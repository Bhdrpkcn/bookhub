import React, { useState } from "react";
import { Avatar, Modal, Input, Button } from "antd";
import {
  UserOutlined,
  EditFilled,
  LogoutOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setUserName } from "../../redux/reducers/greetingReducer";
import "./user.css";

const User = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  const userName = useSelector((state) => state.greeting.userName);
  const recommendedGenres = useSelector(
    (state) => state.books.recommendedGenres
  );

  console.log(recommendedGenres)
  const openModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setEditMode(false);
    setNewUserName("");
  };

  const handleEditClick = () => {
    setEditMode(true);
    setNewUserName(userName);
  };

  const handleSaveClick = () => {
    dispatch(setUserName(newUserName));
    setEditMode(false);
  };
  const handleAbortSaveClick = () => {
    setEditMode(false);
  };

  const handleLogoutClick = () => {
    dispatch(setUserName(""));
    setEditMode(false);
  };

  return (
    <div className="user">
      <Avatar size={64} icon={<UserOutlined />} onClick={openModal} />
      <Modal
        style={{
          backdropFilter: "blur(10px)",
        }}
        title={null}
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="userModal">
          <div className="userModalCredential">
            <Avatar
              size={64}
              icon={
                <UserOutlined
                  style={{
                    color: "yellow",
                  }}
                />
              }
            />
            <div className="userModalSettings">
              {editMode ? (
                <>
                  <Button
                    icon={<CheckOutlined />}
                    shape="circle"
                    onClick={handleSaveClick}
                  />
                  <Button
                    icon={<CloseOutlined />}
                    shape="circle"
                    onClick={handleAbortSaveClick}
                  />
                </>
              ) : (
                <Button
                  icon={<EditFilled />}
                  shape="circle"
                  onClick={handleEditClick}
                />
              )}
              {!editMode && (
                <Button
                  icon={<LogoutOutlined />}
                  shape="circle"
                  onClick={handleLogoutClick}
                />
              )}
            </div>
            {editMode ? (
              <>
                <Input
                  className="userInput"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                />
              </>
            ) : (
              <>
                <h2>{userName}</h2>
                {userName && <div>{userName}@mockMail.com</div>}
              </>
            )}
          </div>
          <div className="userModalContents">
            <h3>Recommended Genres Based on Your Favorites</h3>
            <h4>Book contents</h4>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default User;
