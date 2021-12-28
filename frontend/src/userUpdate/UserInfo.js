import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import DefaultImage from "../assets/images/Im0.jpg";
import Invitation from "../component/Main/Invitation";
import style from "../assets/scss/UserInfo.scss";
import AvatarComponent from "../assets/scss/AvatarComponent.scss";
import InvitationList from "../component/Main/InvitationList";
import styleChatInvite from "../assets/css/ChatInvite.css";

const UserInfo = (props) => {
  const stylesLogoutBtn = {
    marginLeft: "5%",
  };
  const [formInfo, setFormInfo] = useState({
    name: "",
    avatar: "",
    phone: "",
    company: "",
  });

  const chgForm = (e) => {
    let { name, value } = e.target;

    setFormInfo({
      ...formInfo,
      [name]: value,
    });

    console.log(formInfo);
  };

  useEffect(async () => {
    try {
      const response = await fetch("/api/member/edit", {
        //로그인한 회원의 회원정보를 가져오는 부분
        method: "get",
        mode: "cors",
        credentials: "include",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        redirect: "follow",
        referrer: "client",
        body: null,
      });

      const jsonResult = await response.json();
      if (jsonResult.result !== "success") {
        throw new Error(`${jsonResult.result} ${jsonResult.message}`);
      }
      setFormInfo({
        name: jsonResult.data.name,
        avatar: jsonResult.data.avatar,
        email: jsonResult.data.email,
        phone: jsonResult.data.phone,
        company: jsonResult.data.company,
      });
    } catch (err) {}
  }, []);
  const styles = {
    backgroundImage: formInfo.avatar,
  };

  /**
   *  로그아웃 함수
   */
  const handlerLogOut = async (e) => {
    e.preventDefault();

    await fetch(`/api/member/logout`, {
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
    location.href = "/login";
  };

  return (
    <div className={style.UserInfo}>
      <div className={AvatarComponent.avatarComponent}>
        <div className="avatarComponent-column">
          <Image
            src={`http://localhost:8080/upload-file/${formInfo.avatar}`}
            roundedCircle={true}
            width="150px"
            height="150px"
            alt="프로필 이미지"
          />
          <span className="statuspoint"></span>
        </div>
      </div>
      <div className="User UpdateForm">
        <div className={style.form}>
          <h4>회원정보</h4>
          <br />

          <h5>Email address</h5>
          <h6 name="email">{formInfo.email}</h6>

          <h5>Name</h5>
          <h6 name="name">{formInfo.name}</h6>

          <h5>Phone</h5>
          <h6 name="phone">{formInfo.phone}</h6>

          <h5>Company</h5>
          <h6 name="company">{formInfo.company}</h6>

          <br />
          <div className={style.button}>
            <Button
              variant="primary"
              type="button"
              onClick={props.handlerOnChangeComponent}
            >
              {`회원정보 수정`}
            </Button>
            <Button
              variant="primary"
              type="button"
              style={stylesLogoutBtn}
              onClick={handlerLogOut}
            >
              로그아웃
            </Button>
          </div>
        </div>
      </div>
      <InvitationList/>      
      {}
    </div>
  );
};

export default UserInfo;
