import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import ImageFileInput from "../image_file_input/image_file_input";
import ImageUploader from "../../service/image_uploader";

import styles from "../../assets/scss/PostWrite.scss";
import { NavItem } from "react-bootstrap";

const PostWrite = ({ partid, teamid }) => {
  const imageUploader = new ImageUploader();
  const FileInput = (props) => (
    <ImageFileInput {...props} imageUploader={imageUploader} />
  );

  const [title, setTitle] = useState("");
  const [origName, setOrigName] = useState("");
  const [contents, setContents] = useState("");
  const [thumbnail, setThumbnail] = useState();
  const [postAdd, setPostAdd] = useState(false);
  const partId = partid;
  const teamId = teamid;

  const handlerOnClickPostAdd = async (e) => {
    //글 작성을 위한 함수
    e.preventDefault();
    console.log({ title, contents });

    try {
      const response = await fetch(`/api/post/${partId}`, {
        method: "post",
        mode: "cors",
        credentials: "include",
        cache: "no-cache",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "client",
        body: JSON.stringify({ title, contents, thumbnail }),
      });
    } catch (err) {
      console.log(err);
    }

    location.href = `/${teamId}/post/${partId}`;
  };

  const callback = (fileName) => {
    console.log("b", fileName);
    changedFile = fileName;
  };

  const onFileChange = (file) => {
    setThumbnail(file.storeName);
    setOrigName(file.name);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeContents = (e) => {
    setContents(e.target.value);
  };

  return (
    <div className={styles.PostWrite}>
      <h2>게시글 작성</h2>
      <br />
      <form enctype="multipart/form-data" onSubmit={handlerOnClickPostAdd}>
        <table>
          <tr className="posttitle">
            <td className={styles.Title}>{"제목"}</td>
            <td>
              <input
                name="title"
                type="text"
                onChange={onChangeTitle}
                className={styles.InputTitle}
              />
            </td>
          </tr>
          <br />
          <tr className={styles.Contents}>
            <td>{"내용"}</td>
            <td height="400px">
              <textarea
                name="contents"
                cols="95"
                rows="20"
                onChange={onChangeContents}
                className={styles.InputContents}
              />
            </td>
          </tr>
          <br />
          <tr className="postimg">
            <td>{"File"}</td>
            <td>
              <div className={styles.fileContainer}>
                <FileInput
                  name={origName}
                  callback={callback}
                  onFileChange={onFileChange}
                  className={styles.InputImage}
                />
              </div>
            </td>
          </tr>
        </table>
        <div className={styles.btnContainer}>
          <Button
            variant="secondary"
            size="lg"
            type="submit"
            onClick={handlerOnClickPostAdd}
          >
            작성 완료
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostWrite;
