import React, { Fragment, useState } from "react";
import Contents from "./Contents";
import NavLeft from "./NavLeft";
import NavRight from "./NavRight";
import NavTop from "./NavTop";

import styles from "../assets/scss/layout/Contents.scss";
import styles2 from "../assets/scss/layout/Body.scss";
import WebSocketProvider, { WebSocketContext } from '../Websocket/WebSocketProvider';

const SiteLayout = ({
  FileInput,
  children,
  postidforComment,
  postforComment,
}) => {
 const [navLeftChange, setNavLeftChange]=useState(true);
 const preNavLeftState = navLeftChange;
  const onHandlerNavLeftChange=()=>{
    console.log('x 버튼 클릭 : ', navLeftChange, '   ', preNavLeftState);
    setNavLeftChange(!navLeftChange)
  }

  return (
    <Fragment>
      <NavLeft />
      <div className={styles2.Body}>
        <NavTop />
        <div className={styles.Contents}>{children}</div>
      </div>
      <NavRight
        /*FileInput={FileInput}*/
        postidforComment={navLeftChange===true?postidforComment:''}
        postforComment={navLeftChange===true?postforComment:''}
        onHandlerNavLeftChange={onHandlerNavLeftChange}
      />
    </Fragment>
  );
};

export default SiteLayout;
