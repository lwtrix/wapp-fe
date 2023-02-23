import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import ChatMessage from "../chat-message/ChatMessage";
import { AiOutlineSearch } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";

import "./selected-chat.css";

const SelectedChat = () => {
  const selectedChat = useSelector((state) => state.selectedChat.chat);
  const currentUser = useSelector((state) => state.currentUser.user);
  const [chatUser, setChatUser] = useState({
    username: "",
    status: "",
  });
  const [newMsg, setNewMsg] = useState(" ");

  const renderNewMsg = (msg) => {
    selectedChat.messages.push(msg);
  };

  const handleSendMsg = async () => {
    if (newMsg) {
      console.log(newMsg);
      const options = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(newMsg),
      };
      const baseEndpoint = process.env.REACT_APP_BE_DEV;
      const res = await fetch(
        `${baseEndpoint}/messages/${selectedChat._id}`,
        options
      );
      const newMsg = await res.json();
      renderNewMsg(newMsg);
      setNewMsg("");
    }
  };

  useEffect(() => {
    const otherUser = selectedChat.members.find(
      (member) => member._id !== currentUser._id
    );
    setChatUser({
      username: otherUser.username,
      status: otherUser.status,
    });
  }, [selectedChat]);

  return (
    <div className="selected-chat">
      <div className="header d-flex justify-content-between">
        <div className="d-flex">
          <div className="img-container">
            <img className="img" src="https://via.placeholder.com/45 " />
          </div>
          <div className="text-container d-flex align-items-center">
            <div>
              <div className="username">{chatUser.username}</div>
              <div className="status text-muted">{chatUser.status}</div>
            </div>
          </div>
        </div>
        <div className="d-flex text-color">
          <AiOutlineSearch size={25} className=" mx-3" />
          <BiDotsVerticalRounded size={25} className="mx-4" />
        </div>
      </div>
      <div className="chat-body">
        {selectedChat.messages.length
          ? selectedChat.messages.map((msg) => (
              <ChatMessage msg={msg} key={msg._id} />
            ))
          : null}
      </div>
      <div className="msg-input">
        <div className="input-container">
          <Form.Control
            type="text"
            placeholder="New message"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            id="input-field"
          />
        </div>
        <div className="btn-container">
          <Button
            variant="warning"
            className="send-btn"
            onClick={handleSendMsg}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectedChat;
