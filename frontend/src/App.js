import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Login from "./login/Login";
import Join from "./join/Join";
import Main from "./component/Main/Main";
import Post from "./component/Main/Post"; //postlist
import PostWork from "./component/Main/PostWork"; //postwrite, modify, del, showComment
import Chat from "./component/Chat/Chat";
import Welcome from "./welcome/Welcome";
import FindId from "./findid/FindId";
import WebSocketProvider from "./Websocket/WebSocketProvider";
import SiteLayout from "./layout/SiteLayout";
import ChatRoomList from "./component/Chat/ChatRoomList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/:teamid/post/:partid" element={<Post />} />
        <Route path="/:teamid/post/:category/:postid" element={<PostWork />} />
        <Route path="/" element={<Login />} />
        <Route path="/:teamid/main" element={<Main />} />
        <Route path="/:teamid/chat/:roomId" element={<Chat />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/findid" element={<FindId />} />
        <Route path="/chatroomlist" element={<ChatRoomList />} />
        <Route path="/sitelayout" element={<SiteLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
