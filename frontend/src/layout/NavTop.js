import React, { useState, useRef, useEffect, useContext } from 'react';
import SockJsClient from 'react-stomp';
import * as SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import { WebSocketContext } from '../Websocket/WebSocketProvider';
import styles from '../assets/scss/layout/NavTop.scss'

const NavTop = (props) => {
    const loginMember = JSON.parse(window.sessionStorage.getItem("loginMember"));
    const $websocket = useRef(null);
    const client  = useContext(WebSocketContext);
    const handlerOpenNavRight = (e) => {
        e.preventDefault()
    }



    return (
        <header className={styles.NavTop}>
            <div className={styles.Block}>
                PINGPONG
            </div>
            {
                // <SockJsClient url="http://localhost:8080/ws-stomp"
                //     topics={[`/sub/${loginMember.id}`]}
                //     onMessage={msg => { console.log(msg); alert(msg); }} ref={$websocket} />
            }
        </header>
    );
};
export default NavTop;