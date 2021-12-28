import React,{useState} from 'react';
import styleChatInvite from '../../assets/css/ChatInvite.css';
const ChatInviteSearchBar = ({keyword,callback}) => {
    
    return (
        <div>
            <input type='text' placeholder='검색할 회원의 이름을 입력해주세요.' value={keyword} onChange={(e) => callback(e.target.value) } className={styleChatInvite.InputText}/>
        </div>
    );
};

export default ChatInviteSearchBar;