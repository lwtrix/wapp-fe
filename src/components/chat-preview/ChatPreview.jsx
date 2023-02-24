import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleSelectChat } from "../../redux/actions/chatActions";

import "./chat-preview.css";

const ChatPreview = ({ chat }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.currentUser.user);
  const [chatUser, setChatUser] = useState(null);
  const [latestMessage, setLatestMessage] = useState({
    user: "",
    text: "",
  });

  const handleSelect = () => {
    dispatch(handleSelectChat(chat._id))
  }

  useEffect(() => {
    const otherUser = chat.members.find(
      (member) => member._id !== currentUser._id
    );
    setChatUser(otherUser);

    if (chat.messages.length) {
      const latestMsgSender = chat.members.find(
        (member) => member._id === chat.messages[0].sender
      );
      setLatestMessage({
        text: chat.messages[0].content.text,
        user: latestMsgSender.username,
      });
    }
  }, [currentUser]);

  return (
    <div className="chat-preview" onClick={handleSelect}>
      <div className="img-container">
        <img className="img" src="https://via.placeholder.com/65 " />
      </div>
      <div className="text-container">
        <span className="username">{chatUser && chatUser.username}</span>
        <span className="latest-message">
          {latestMessage.user !== currentUser.username
            ? latestMessage.text && `${latestMessage.user}: ${latestMessage.text}`
            : latestMessage.text && `You: ${latestMessage.text}`}
        </span>
      </div>
    </div>
  );
};

export default ChatPreview;
