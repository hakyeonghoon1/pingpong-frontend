import React, { useEffect, useState, useRef } from "react";
import * as SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import { useParams } from "react-router";
import SiteLayout from "../../layout/SiteLayout";
import MessageList from "./MessageList";
import Notice from "./Notice";
import MessageInput from "../../assets/css/MessageInput.css";
import Button from "react-bootstrap/Button";
import ParticipantList from "./ParticipantList";
import stylesChatBox from "../../assets/css/ChatBox.css";

const Chat = () => {
  const loginMember = JSON.parse(window.sessionStorage.getItem("loginMember"));
  const [senderAvatar, setSenderAvatar] = useState(loginMember.avatar);
  const textRef = useRef();
  const { roomId } = useParams();
  const [notice, setNotice] = useState("");
  const [participant, setParticipant] = useState([]);
  const [messages, setMessages] = useState([]);
  const dateNow = new Date();
  const styles = {
    overflowY: "auto",
    height: "700px",
    // display: "flex",
    flexDirection: "column-reverse",
    backgroundColor: "#b2c9ed",
  };

  useEffect(async () => {
    try {
      /**
       * 채팅방 채팅 내역 리스트 불러오는 함수
       */
      const response = await fetch(`/api/chat/${roomId}`, {
        method: "get",
        mode: "cors",
        credentials: "include",
        cache: "no-cache",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "client",
        body: null,
      });

      const jsonResult = await response.json();
      console.log('asdfsadf',jsonResult);
      setMessages(jsonResult);

      /**
       *  채팅방 참여자 리스트
       */
      const response2 = await fetch(`/api/room/participant/${roomId}`, {
        method: "get",
        mode: "cors",
        credentials: "include",
        cache: "no-cache",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "client",
        body: null,
      });

      const jsonResult2 = await response2.json();
      console.log("참여자리스트", jsonResult2.data);
      setParticipant(jsonResult2.data);
    } catch (err) {
      console.log(err);
    }
  }, [roomId, senderAvatar]);

  /*======================= socket,stomp 연결 ================================ */

  const roomName = "roomName";
  const loginName = loginMember.name;
  const loginId = loginMember.id;

  const client = useRef({});
  const [message, setMessage] = useState("");

  /**
   *  룸 ID 변경 시 실행되는 함수 (Stomp,socket 연결)
   */
  useEffect(() => {
    connect();

    return () => disconnect();
  }, [roomId]);

  /**
   *  Stomp 연결 함수
   */
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
        subscribe();
        enterRoom();
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

  /**
   *  Stomp Subscribe 함수
   */
  const subscribe = () => {
    client.current.subscribe(`/sub/chat/room/${roomId}`, ({ body }) => {
      setSenderAvatar(body.avatar);
      setMessages((messages) => [...messages, JSON.parse(body)]);
      console.log("body!!!", body);
    });
  };

  /**
   * 방에 입장함 -> roomId를 이용하여 redis에 연결함
   */
  const enterRoom = () => {
    client.current.publish({
      destination: "/pub/chat/enter",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId: roomId,
      }),
    });
  };
  /**
   *  Stomp Publish 함수
   */
  const publish = (message, type) => {
    window.sessionStorage.getItem("loginMember");
    if (!client.current.connected) {
      return;
    }

    client.current.publish({
      destination: "/pub/chat/message",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // avatar :loginMember.avatar,
        type: type,
        roomId: roomId,
        senderId: loginId,
        message: message,
        sender: loginName,
      }),
      
    });
    console.log(loginMember.avatar);
    setMessage("");
  };

  //공지사항 바꾸기 위한 콜백
  const noticeCallback = (notice) => {
    setNotice(notice);
    publish("공지사항이 등록되었습니다.", "TALK");
  };

  const handleEnter = (e) => {
    if (e.which === 13) {
      // enter를 눌렸을 때
      e.target.value !== "" && e.which === 13 && publish(e.target.value);
      e.target.value = "";
    }
  };

  const handleButton = (e) => {
    console.log("asdf", MessageInput);
    handleEnter(MessageInput.TextBox);
  };

  const handlerSend = (e) => {
    e.preventDefault();
    textRef.current.value !== "" && publish(textRef.current.value);
    textRef.current.value = "";
  };

  /*================================================================== */
  return (
    <SiteLayout /*FileInput={FileInput} */ isSearch={false}>
      <Notice roomId={roomId} participant={participant} />
      <div style={styles} className={stylesChatBox.ChatDiv}>
        <MessageList
          messages={messages}
          roomId={roomId}
          callback={noticeCallback}
        />
      </div>
      <div className={stylesChatBox.Input}>

          <form onSubmit={handlerSend} className={stylesChatBox.Form}>
            <input
              className={MessageInput.TextBox}
              type="text"
              placeholder="메세지를 입력해주세요."
              //value={message}
              //onChange={(e) => setMessage(e.target.value)}
              ref={textRef}
              onKeyPress={handleEnter}
              name="inputText"
            />
            <Button
              className={MessageInput.Button}
              onClick={handleButton}
              type="submit"
            >
              전송
            </Button>
          </form>

      </div>
    </SiteLayout>
  );
};

export default Chat;