import React, { useEffect, useState } from 'react';
import stylesNotice from '../../assets/css/Notice.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ParticipantList from './ParticipantList';
const Notice = ({roomId,participant}) => {

    const [notice,setNotice] = useState('');
    //const [participant, setParticipant] = useState([]);


    const dropdownStyle ={
        display:'block',
        float:'left'
    }
    /**
     *  채팅방 공지사항 불러오는 함수
     */
    useEffect(async()=>{
        const response = await fetch(`/api/room/notice/${roomId}`, {
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
        setNotice(data.notice);
    })

    return (
        <div className={stylesNotice.Notice}>
            { notice == null ? null : <h2>[공지] : {notice}</h2>}
            <ParticipantList participant={participant} style={dropdownStyle}/>
        </div>
    );
};

export default Notice;