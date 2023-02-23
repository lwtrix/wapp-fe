import React, { useEffect, useState } from "react";
import moment from "moment";
import { format, formatDistance, sub, subDays } from "date-fns";
import { useSelector } from "react-redux";
import "./chat-message.css";

const ChatMessage = ({ msg }) => {
  const selectedChat = useSelector((state) => state.selectedChat.chat);
  const currentUser = useSelector((state) => state.currentUser.user);
  const [msgTime, setMsgTime] = useState(null);

  const handleDateAndTime = () => {
    const today = format(new Date(), "yyyy/dd/MM");
    const msgDate = format(new Date(msg.createdAt), "yyyy/dd/MM");

    if (today !== msgDate) {
      const differenceInTime =
        new Date().getTime() - new Date(msg.createdAt).getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      const formattedDate = formatDistance(
        subDays(new Date(msg.createdAt), Math.ceil(differenceInDays)),
        new Date(msg.createdAt),
        { addSuffix: true }
      );
      setMsgTime(formattedDate);
    } else {
      const formattedTime = format(new Date(msg.createdAt), "HH/mm");
      setMsgTime(formattedTime);
    }
  };

  useEffect(() => {
    handleDateAndTime();
  }, [selectedChat]);
  if (msg.sender.username !== currentUser.username) {
    return (
      <div className="chat-message-anotherUser d-flex align-items-end mb-4">
        <div id="chat-message-content" className="d-flex">
          <p className="m-0 d-flex align-items-end me-2">
            {msg.sender.username}: {msg.content.text}{" "}
          </p>
          <p
            className="m-0 text-muted d-flex align-items-end"
            style={{ fontSize: "14px" }}
          >
            {msgTime && msgTime.replace("/", ":")}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-end">
        <div className="chat-message-me d-flex align-items-end mb-4">
          <div id="chat-message-content" className="d-flex">
            <p className="m-0 d-flex align-items-end me-2">
              {msg.sender.username}: {msg.content.text}{" "}
            </p>
            <p
              className="m-0 text-muted d-flex align-items-end"
              style={{ fontSize: "14px" }}
            >
              {msgTime && msgTime.replace("/", ":")}
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default ChatMessage;
