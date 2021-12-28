import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import ImageFileInput from "../component/image_file_input/image_file_input";
import ImageUploader from "../service/image_uploader";

import style from "../assets/scss/UserInfo.scss";

const UserUpadteForm = (props) => {
  const imageUploader = new ImageUploader();
  const FileInput = (props) => (
    <ImageFileInput {...props} imageUploader={imageUploader} />
  );

  let changedFile;
  const baseUrl = "../assets/images/";
  const [avatar, setAvatar] = useState("Im0.jpg");
  const avatarImage = avatar;
  const [changeValue, setChangeValue] = useState(0);
  const [formInfo, setFormInfo] = useState({
    name: "",
    avatar: "Im0.jpg",
    phone: "",
    company: "",
    origName: "",
  });

  const onFileChange = (file) => {
    console.log("ggggg", file);
    setFormInfo({
      ...formInfo,
      avatar: file.storeName,
      storeName: file.storeName,
      origName: file.name,
    });
  };

  const chgForm = (e) => {
    let { name, value } = e.target;
    setFormInfo({
      ...formInfo,
      [name]: value,
    });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    await axios
      .patch("/api/member/edit", formInfo, {
        //회원정보 수정 부분
        headers: {},
      })
      .then((res) => {
        console.log(res.data);
        if (res.data !== null) {
          console.log("수정된 내용 : ", formInfo);
          alert("수정완료");
          props.handlerOnChangeComponent(true)
        } else {
          alert("수정실패");
        }
      });
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
      console.log(jsonResult);

      if (jsonResult.result !== "success") {
        throw new Error(`${jsonResult.result} ${jsonResult.message}`);
      }
      setAvatar(jsonResult.data.avatar);
      setFormInfo({
        name: jsonResult.data.name,
        avatar: jsonResult.data.avatar,
        email: jsonResult.data.email,
        phone: jsonResult.data.phone,
        company: jsonResult.data.company,
        fileName: jsonResult.data.fileName,
        status: "LOGIN",
      });
    } catch (err) {
    } finally {
      //   console.log("formInfo: json :", jsonResult.data.avatar);
    }
  }, []);

  console.log("ooout: formInfo.avatar: state:", formInfo.avatar);

  const callback = (fileName) => {
    console.log("b", fileName);
    changedFile = fileName;
  };

  const imageUpload2 = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pdzaoz52");

    let response;

    const result = await axios
      .post("/api/file/upload", data, {
        //회원정보 수정 부분
        headers: {
          "content-type": "multipart/form-data",
        },
        body: data,
      })
      .then((res) => {
        console.log(res.data);
        response = res.data;
      });

    return response;
  };

  return (
    <div className={style.UserInfo}>
      <div class="text-center">
        <Image
          src={`http://localhost:8080/upload-file/${formInfo.avatar}`}
          roundedCircle={true}
          class="rounded mx-auto d-block"
          width="150px"
          height="150px"
          alt="프로필 이미지"
        />
        <span className="status-point"></span>
      </div>
      <br />
      <div className="User UpdateForm">
        <div className={style.form}>
          <Form onSubmit={handlerSubmit} enctype="multipart/form-data">
            <br />
            <FileInput
              name={formInfo.origName}
              callback={callback}
              onFileChange={onFileChange}
            />
            <br />

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={formInfo.email}
                onChange={chgForm}
                name="email"
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formInfo.name}
                onChange={chgForm}
                name="name"
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={formInfo.phone}
                onChange={chgForm}
                name="phone"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                value={formInfo.company}
                onChange={chgForm}
                name="company"
              />
            </Form.Group>
            <br />
            <br />
            <div className={style.button}>
              <div className={style.Button1}>
                {" "}
                <Button
                  variant="primary"
                  type="button"
                  onClick={props.handlerOnChangeComponent}
                >
                  돌아가기
                </Button>
              </div>
              <div className={style.Button2}>
                {" "}
                <Button variant="primary" type="submit">
                  {" "}
                  회원정보 수정{" "}
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserUpadteForm;
