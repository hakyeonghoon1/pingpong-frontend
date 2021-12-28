import React, { useState, useContext, useEffect } from "react";
import SiteLayout from "../../layout/SiteLayout";
import styles from "../../../assets/scss/Main.scss";
import { WebSocketContext } from "../../Websocket/WebSocketProvider";

const Main = ({ FileInput }) => {
  //welcome page 추가 예정
  const client = useContext(WebSocketContext);

  useEffect(() => {
    console.log(client);
  });
  return (
    <SiteLayout FileInput={FileInput}>
      <h2>[Main]</h2>
      {/* <Post /> */}
    </SiteLayout>
  );
};

export default Main;
