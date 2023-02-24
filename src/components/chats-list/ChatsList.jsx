import React, { useEffect, useState } from "react";
import ChatPreview from "../chat-preview/ChatPreview";

import "./chats-list.css";

const ChatsList = () => {
  const [chats, setChats] = useState([]);

  const getUserChats = async () => {
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`,
      },
    };

    const baseEndpoint = process.env.REACT_APP_BE_DEV;
    const res = await fetch(`${baseEndpoint}/chats`, options);

    const chats = await res.json();
    setChats(chats);
  };

  useEffect(() => {
    getUserChats();
  }, []);

  return (
    <div className="chats-list w-100">
      <div className="content w-100">
        {chats.length && chats.map((chat) => <ChatPreview chat={chat} key={chat._id}/>)}
      </div>
    </div>
  );
};

export default ChatsList;
