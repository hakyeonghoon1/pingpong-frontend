import React, { useEffect, useRef } from "react";
import * as SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";

const WebSocketContext = React.createContext(null);
export { WebSocketContext };

export default ({ children }) => {
  const client = useRef(null);

  useEffect(() => {
      
    connect();
    

    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws-stomp"), // proxy를 통한 접속
      connectHeaders: {
        "auth-token": "spring-chat-auth-token",
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("✅ connect StompJs");
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
  };

  /**
   *  Stomp 연결 끊는 함수
   */
  const disconnect = () => {
    client.current.deactivate();
  };

  return (
    <WebSocketContext.Provider value={client}>
      {children}
    </WebSocketContext.Provider>
  );
};