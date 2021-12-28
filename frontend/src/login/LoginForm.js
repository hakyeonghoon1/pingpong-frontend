import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../assets/css/LoginForm.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";

export default function () {
  const [selectTeam, setSelectTeam] = useState("");
  const [successAdd, setSuccessAdd] = useState(true);

  const styleBtnDiv = {
    border: "1px solid blue",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  };

  const styles1 = {
    width: "35vh",
  };

  // ID/PW
  const styles2 = {
    fontWeight: "bold",
    textDecoration: "none",
  };

  const styles3 = {
    width: "35vh",
  };

  const [formInfo, setFormInfo] = useState({
    email: "",
    password: "",
  });

  /**
   *  로그인 함수
   *  (로그인 버튼 클릭시)
   */
  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (formInfo.email == "") {
      alert("이메일을 입력해주세요");
      return;
    }

    if (formInfo.password == "") {
      alert("비밀번호를 입력해주세요");
      return;
    }

    try {
      const jsonResult = await axios.post("/api/member/login", formInfo, {
        headers: { "Content-Type": `application/json` },
      });
      console.log('jsonResult',jsonResult);
      const member = jsonResult.data.data.member;
      const result = jsonResult.data.result;

      console.log("3www", result);
      console.log("member1234",member);
      window.sessionStorage.setItem("loginMember", JSON.stringify(member));
      setSuccessAdd(!successAdd);
      getTeamList();
    } catch (e) {
      console.log(e);
      // console.error(e);
      alert("회원정보가 일치하지 않습니다.");
    }
  };
  /**
   *  본인이 속한 팀 리스트 부르는 함수
   */
  const getTeamList = async () => {
    try {
      const response = await fetch("/api/team/list", {
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
      console.log(data);

      if (data.data.teamList.length !== 0) {
        window.sessionStorage.setItem(
          "selectTeam",
          JSON.stringify(data.data.teamList[0])
        ); //받아온 team list 중 디폴트 team을 session storage에 할당

        setSelectTeam(JSON.parse(sessionStorage.getItem("selectTeam")));
        console.log(
          "select team : ",
          JSON.parse(sessionStorage.getItem("selectTeam")).team_id
        );

        const defaultTeam = data.data.teamList[0].team_id;
        const defaultRoom = data.data.teamList[0].room_id;
        console.log('defaultTeam',defaultTeam,'defaultRoom',defaultRoom);
        location.href = `/${defaultTeam}/chat/${defaultRoom}`;
      } else {
        location.href = "/welcome";
      }
    } catch (err) {
      console.log(err);
    }
  };
  /**
   *  Form 내용 set하는 함수
   */
  const chgForm = (e) => {
    let { name, value } = e.target;

    setFormInfo({
      ...formInfo,
      [name]: value,
    });

    console.log(formInfo);
  };

  //
  const moveJoin = (e) => {
    e.preventDefault();
    location.href = "/join";
  };
  return (
    <div className={styles.LoginForm}>
      <Form onSubmit={handlerSubmit} style={styles1}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            onChange={chgForm}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={chgForm}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Button variant="primary" type="submit" style={styles3}>
            로그인
          </Button>
        </Form.Group>
        <Button
          variant="primary"
          type="button"
          style={styles3}
          onClick={moveJoin}
        >
          회원가입
        </Button>
      </Form>
      <div>{"  "}</div>
      <NavLink style={styles2} to={`/findid`}>
        ID 찾기
      </NavLink>
    </div>
  );
}
