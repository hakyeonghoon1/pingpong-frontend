import React, { useState,useRef } from "react";
import Comment from "../component/Main/Comment";
import styles from "../assets/scss/layout/NavRight.scss";
import Profile from "../userUpdate/Profile";
import SockJsClient from 'react-stomp';

const NavRight = ({ FileInput, postidforComment, postforComment,  onHandlerNavLeftChange, navLeftChange}) => {
  //navright 로 들어오는 정보를 통해 profile을 출력할지 commnet를 출력할지 결정하는 comment
  const $websocket = useRef(null);
  const [inviteMessage, setInviteMessage] = useState(0);
  const loginMember = JSON.parse(window.sessionStorage.getItem("loginMember"));
 
  return (
    <div className={styles.NavRight}>
      {(
              postidforComment === "" ||
              postidforComment == undefined ||
              postforComment === "" ||
              postforComment == undefined ? 

              
                <Profile FileInput={FileInput} inviteMessage={inviteMessage} onHandlerNavLeftChange={onHandlerNavLeftChange} />
               : 
                <Comment
                  postidforComment={postidforComment}
                  postforComment={postforComment}
                  onHandlerNavLeftChange={onHandlerNavLeftChange}
                />
             ) 
            
    }
    </div>
  );
};

export default NavRight;
