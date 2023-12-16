import React, { useState } from "react";
import { Avatar, Modal, Input, Button } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import {
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { removeAllFavorites } from "../../redux/reducers/bookSlice";
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

  console.log(recommendedGenres);
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
    dispatch(removeAllFavorites());
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
                <div >
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
                </div>
              ) : (
                <Button
                  icon={<LoginOutlined />}
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
                style={{
                  marginTop:"4rem",
                  marginBottom:"8rem"
                }}
                  className="userInput"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                />
              </>
            ) : (
              <>
                <h2>{userName}</h2>
                {userName && (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {userName}@mockMail.com
                    </div>
                    <div className="userModalContents">
                      <h3>Recommended Genres Based on Your Favorites</h3>
                      <div className="userGenres">
                        {recommendedGenres.length > 0 ? (
                          recommendedGenres.map((genre, index) => (
                            <Button
                            
                              style={{
                                margin: ".2rem",
                                width: 200,
                              }}
                              key={index || genre}
                            >
                              {genre}
                            </Button>
                          ))
                        ) : (
                          <p style={{
                            color:"crimson"
                          }}>
                            Explore personalized genres by adding your favorite
                            books!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {!userName && (
                  <div>
                    <div className="userModalContents">
                      <WarningOutlined
                        style={{
                          color: "crimson",
                          scale: "2",
                        }}
                      />
                      <h3
                        style={{
                          color: "darkred",
                        }}
                      >
                        You've to login to see recommendations...
                      </h3>
                      <div className="userGenres">
                        <p style={{
                          color: "darkred",
                        }}>
                          Logout will reset the favorited books and
                          recommendation...
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default User;
