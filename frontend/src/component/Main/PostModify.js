import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import SiteLayout from "../../layout/SiteLayout";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import ImageFileInput from "../image_file_input/image_file_input";
import ImageUploader from "../../service/image_uploader";

import styles from "../../assets/scss/PostModify.scss";

const PostModify = (props) => {
  const imageUploader = new ImageUploader();
  const FileInput = (props) => (
    <ImageFileInput {...props} imageUploader={imageUploader} />
  );

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [origName, setOrigName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [partId, setPartId] = useState("");
  //   const [post, setPost] = useState([]);

  const stylesContent = {
    width: "50%",
  };
  useEffect(async () => {
    try {
      const response = await fetch(`/api/post/update/${props.postid}`, {
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

      setTitle(jsonResult.data.title);
      setContents(jsonResult.data.contents);
      setThumbnail(jsonResult.data.thumbnail);
      setPartId(jsonResult.data.partId);
    } catch (err) {
      console.log(err);
    }
  }, []);
  const handlerOnClickPostModify = async (e) => {
    //수정된 post 내용을 전송하는 post id
    e.preventDefault();

    try {
      const response = await fetch(`/api/post/update/${props.postid}`, {
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
        body: JSON.stringify({ title, contents, thumbnail }),
      });
    } catch (err) {
      console.log(err);
    }
    location.href = `/${props.teamid}/post/${partId}`;
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeContents = (e) => {
    setContents(e.target.value);
  };

  const callback = (fileName) => {
    console.log("b", fileName);
    changedFile = fileName;
  };

  const onFileChange = (file) => {
    console.log("2131231231", file);
    setThumbnail(file.storeName);
    setOrigName(file.name);
  };

  return (
    <div className={styles.updatePost}>
      <h2>[게시글 수정]</h2>
      <form action method="post" enctype="multipart/form-data">
        <table className={styles.updateTable}>
          {/* 타이틀 */}
          <tr className={styles.titleContainer}>
            <td>제목</td>
            <td>
              <input
                className={styles.styleInput}
                name="title"
                type="text"
                onChange={onChangeTitle}
                value={title}
              />
            </td>
          </tr>

          {/* 본문내용 */}
          <tr className={styles.contentsContainer}>
            <td>본문</td>
            <td height="400px">
              <textarea
                width="50%"
                name="contents"
                value={contents}
                onChange={onChangeContents}
              />
            </td>
          </tr>

          {/* 첨부파일 */}
          <tr className="postimg">
            <td>{"File"}</td>
            <td>
              <FileInput
                name={origName}
                callback={callback}
                onFileChange={onFileChange}
              />
            </td>
          </tr>
        </table>
        {/* submit 버튼 */}
        <div className={styles.btnContainer}>
          <Button
            variant="secondary"
            size="lg"
            type="submit"
            onClick={handlerOnClickPostModify}
          >
            작성 완료
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostModify;
