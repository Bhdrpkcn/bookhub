import React, { useState } from "react";
import { Avatar, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const User = () => {
  const [visible, setVisible] = useState(false);
  const userName = useSelector((state) => state.greeting.userName);
console.log(userName)
  const openModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        transform: "scale(0.75)",
        paddingRight: "1rem",
        cursor: "pointer",
      }}
    >
      <Avatar size={64} icon={<UserOutlined />} onClick={openModal} />
      <Modal
        style={{
          backdropFilter:"blur(5px)"
        }}
        title={userName}
        open={visible}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null} 

      >
        <p>Some content goes here.</p>
      </Modal>
    </div>
  );
};

export default User;
