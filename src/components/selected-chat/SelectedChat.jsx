import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ChatMessage from "../chat-message/ChatMessage";
import { receiveNewMessage, socket } from "../../redux/actions/chatActions";

import "./selected-chat.css";

const SelectedChat = () => {
  const [newMsg, setNewMsg] = useState("");
  const selectedChat = useSelector((state) => state.selectedChat.chat);
  const currentUser = useSelector((state) => state.currentUser.user);
  const dispatch = useDispatch();
  const [chatUser, setChatUser] = useState({
    username: "",
    status: "",
  });

  const broadcastMsg = (msg) => {
    socket.emit("send_message", { chatId: selectedChat._id, msg });
  };

  const handleSendMsg = async () => {
    if (newMsg.length) {
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: {
            text: newMsg,
          },
        }),
      };
      const baseEndpoint = process.env.REACT_APP_BE_DEV;
      const res = await fetch(
        `${baseEndpoint}/messages/${selectedChat._id}`,
        options
      );
      if (res.ok) {
        const msg = await res.json();
        broadcastMsg(msg);
        dispatch(receiveNewMessage(msg));
        setNewMsg("");
      }
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

  useEffect(() => {
    socket.on("receive_message", (message) => {
      dispatch(receiveNewMessage(message.msg));
    });
  }, [socket]);

  return (
    <div className="selected-chat">
      <div className="header">
        <div className="img-container">
          <img className="img" src="https://via.placeholder.com/45 " />
        </div>
        <div className="text-container">
          <div className="username">{chatUser.username}</div>
          <div className="status">{chatUser.status}</div>
        </div>
      </div>
      <div className="chat-body">
        {selectedChat.messages.length
          ? selectedChat.messages.map((msg) => (
              <ChatMessage msg={msg} key={msg._id} />
            ))
          : null}
        {selectedChat.newMessages &&
          selectedChat.newMessages.map((msg) => (
            <ChatMessage msg={msg} key={msg._id} />
          ))}
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
