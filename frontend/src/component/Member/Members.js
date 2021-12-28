import React, { Fragment, useEffect, useState } from 'react';
import stylesMemberBox from '../../assets/css/MemberBox.css';

const Members = ({ teamId }) => {

    const [memberLists, setMemberLists ] = useState([]);
    const stylesName ={
        //border:'1px solid red',
        width:'11vh',
        float:'left',
        fontWeight:'bolder'
    }

    const stylesStatus={
        //border:'1px solid blue',
        width:'10vh',
        float:'left'
    }
    const stylesBlock ={
        //border:'1px solid blue',
    }
    useEffect(async() => {
        const response = await fetch(`/api/member/team/${teamId}`, {
            method: 'get',
            mode: 'cors',
            credentials: 'include',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrer: 'client',
            body: null
        });

        const data = await response.json();
        
        setMemberLists(data);
        console.log('members',data);
    },[teamId])

    return (
        <div className={stylesMemberBox.MemberList}>
            {
                memberLists.map((memberList,index)=>{
                    return (

                        <li><div style={stylesBlock}><div style={stylesName}>{memberList.name}</div> <div style={stylesStatus}>{memberList.status}</div></div></li>
                       
                    )
                })
            }
        </div>

    );
};

export default Members;