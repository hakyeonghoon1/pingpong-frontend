import React, { useState } from "react";
import styles from "../../assets/css/Message.css";
import styles2 from "../../assets/css/Message2.css";
import Modal from "react-modal";
import ReactModal from "react-modal";
import ProfileModaStyle from "../../assets/scss/ProfileModal.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import sampleImg from "../../assets/images/Im0.jpg";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ProfileImgSample from "../../assets/images/Im0.jpg";
import Image from "react-bootstrap/Image";
ReactModal.setAppElement("body");

const Message = ({
  type,
  message,
  sender,
  senderId,
  roomId,
  chatId,
  chatDate,
  avatar,
  callback,
}) => {
  const loginMember = JSON.parse(window.sessionStorage.getItem("loginMember"));

  const [miniProfile, setMiniProfile] = useState({});
  const [modal02IsOpen, setModal02IsOpen] = useState(false);
  const [modal03IsOpen, setModal03IsOpen] = useState(false);

  //substring이 되다가 갑자기 안되는 ㅡㅡ;;
  // const dateTime = chatDate.substring(11,13)+'시 '+chatDate.substring(14,16)+'분';
  //const dateTime = chatDate;
  const imgUrl = "Im0.jpg";

  const dropdownStyle = {
    marginTop: "1%",
    backgroundColor: "#b2c9ed",
    color: "#b2cc9ed",
  };

  // 프로필 이미지
  var profileStyle = {};

  //미니 프로필
  const stylesMiniProfile = {
    width: "285px",
    height: "285px",
  };

  /**
   *  채팅: 상대방 이미지 클릭시 미니 프로필을 띄우기 위한 함수
   */
  const openMiniProfile = async () => {
    setModal02IsOpen(true);

    const response = await fetch(`/api/member/${senderId}`, {
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
    const data = await response.json();
    //console.log('miniprofile',data);
    setMiniProfile(data);
  };

  /**
   *  채팅 더보기 모달 창 띄우는 함수 (공지등록, 메시지 삭제)
   */
  const openSubModal = () => {
    setModal03IsOpen(true);
  };

  /**
   *  공지사항 등록 함수
   */
  const regNotice = async () => {
    console.log(JSON.stringify({ notice: message }));
    const response = await fetch(`/api/room/notice/${roomId}`, {
      method: "PATCH",
      mode: "cors",
      credentials: "include",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrer: "client",
      body: JSON.stringify({ notice: message }),
    });
    setModal03IsOpen(false);
    const data = await response.json();
    callback(data.notice);
  };

  /**
   *  채팅 메세지 삭제함수 (본인 메세지만 가능)
   */
  const deleteChat = async () => {
    const response = await fetch(`/api/chat/${chatId}`, {
      method: "PATCH",
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
    setModal03IsOpen(false);
  };

  return (
    <div className={styles.messageComponent}>
      {loginMember.name !== sender ? (
        <div>
          <div className={styles.Message}>
            <div
              className={styles.Profile}
              onClick={openMiniProfile}
              style={profileStyle}
            >
              <Image
                className={styles.Profile}
                src={`http://localhost:8080/upload-file/${avatar}`}
                onClick={openMiniProfile}
              />
            </div>
            <div className={styles.Block}>
              <div className={styles.UserName}>{sender}</div>
              <div className={styles.Date}>{chatDate}</div>
              <div className={styles.Contents} onClick={openSubModal}>
                {message}
              </div>
            </div>
            <DropdownButton
              id="dropdown-basic-button"
              title=""
              style={dropdownStyle}
            >
              <Dropdown.Item onClick={regNotice}>공지등록</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles2.Message}>
            <DropdownButton
              id="dropdown-basic-button"
              title=""
              style={dropdownStyle}
            >
              <Dropdown.Item onClick={regNotice}>공지등록</Dropdown.Item>
              <Dropdown.Item onClick={deleteChat}>메세지 삭제</Dropdown.Item>
            </DropdownButton>
            <div className={styles2.Block}>
              <div className={styles2.UserName}>{sender}</div>
              <div className={styles2.Date}>{chatDate}</div>
              <div className={styles2.Contents}>{message}</div>
            </div>
          </div>
        </div>
      )}

      <Modal
        className={ProfileModaStyle["Modal"]}
        isOpen={modal02IsOpen}
        onRequestClose={() => setModal02IsOpen(false)}
        contentLabel="modal02 example"
      >
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={`http://localhost:8080/upload-file/${avatar}`}
            style={stylesMiniProfile}
          />
          <Card.Body>
            <Card.Title>{miniProfile.name}</Card.Title>
            <Card.Text>{miniProfile.status}</Card.Text>
            <Button variant="primary">대화하기</Button>
          </Card.Body>
        </Card>
      </Modal>
    </div>
  );
};

export default Message;
