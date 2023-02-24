import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChatsList from "../../components/chats-list/ChatsList";
import { BsFilter } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { TbCircleDashed } from "react-icons/tb";
import { BiMessageDetail } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import "./main.css";
import SelectedChat from "../../components/selected-chat/SelectedChat";

const Main = () => {
  const currentUser = useSelector((state) => state.currentUser.user);
  const selectedChat = useSelector((state) => state.selectedChat.chat);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div
        className="w-100 h-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#111B21" }}
      >
        <div className="pt-3" style={{ width: "80vw", height: "98vh" }}>
          <Row className="h-100 g-0">
            <Col xs={4}>
              <div
                style={{ height: "6vh", backgroundColor: "#202C33" }}
                className="d-flex justify-content-between align-items-center pe-3 px-3"
              >
                <img
                  src={
                    currentUser
                      ? currentUser.avatar
                        ? currentUser.avatar
                        : "https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133354456-stock-illustration-default-placeholder-profile-icon.jpg"
                      : ""
                  }
                  style={{ width: "45px", borderRadius: "50%" }}
                />
                <div
                  className="d-flex justify-content-between"
                  style={{ color: "#AEBAC1", width: "35%" }}
                >
                  <MdGroups size={28} />
                  <TbCircleDashed size={28} />
                  <BiMessageDetail size={28} />
                  <BiDotsVerticalRounded size={28} />
                </div>
              </div>

              <Form.Group className="mb-3 mt-3 w-100 d-flex">
                <Form.Control
                  type="email"
                  placeholder="Search or start new chat"
                  style={{
                    width: "90%",
                    backgroundColor: "#202C33",
                    border: 0,
                  }}
                />
                <div
                  style={{
                    width: "10%",
                  }}
                  className="d-flex align-content-center justify-content-center"
                >
                  <BsFilter className="text-secondary" size={30} />
                </div>
              </Form.Group>
              <ChatsList />
            </Col>
            <Col xs={8}>{selectedChat && <SelectedChat />}</Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Main;
