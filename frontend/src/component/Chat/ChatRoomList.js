import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from "react-modal";
import ChatInviteSearchBar from './ChatInviteSearchBar';
import styleChatInvite from '../../assets/css/ChatInvite.css';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import stylesMemberBox from '../../assets/css/MemberBox.css';
import stylesChatRoomList from '../../assets/css/ChatRoomList.css'

const ChatList = ({ teamId, loginMember }) => {

    //const loginMember = JSON.parse(window.sessionStorage.getItem("loginMember"));
    const [chatRooms, setChatRooms] = useState([]);
    const [modal02IsOpen, setModal02IsOpen] = useState(false);
    const [searchUserResult, setSearchUserResult] = useState([]);
    const [selectedChatInvite, setSelectedChatInvite] = useState();
    const [changeValue, setChangeValue] = useState(0);
    const [keyword, setKeyword] = useState('');
    
    //const profileImage = 'Im0.jpg';

    /**
     *  채팅방 개설 (상대방 초대위한 모달 띄우는 함수) 
     */
    const openChatInviteModal = async (e) => {
        e.preventDefault();
        setModal02IsOpen(true);

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
        setSearchUserResult(data);
        //console.log('asdfdsafsa',data);

    }

    /**
     *  채팅룸 List 불러오는 함수
     */
    useEffect(async () => {
        const response2 = await fetch(`/api/room/${teamId}`, {
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
        })

        const data2 = await response2.json();
        setChatRooms(data2.roomDtoList);
        //console.log('chatRooms',data2.roomDtoList);

    }, [changeValue, teamId]);
    
    /**
     *  채팅방 개설을 위한 맴버 선택 함수
     */
    const selectChatMember = (e) => {
        const selectedMemberId = e.target.value;
        setSelectedChatInvite(selectedMemberId);
    }

    /**
     *  채팅방 개설 (상대방 선택후 채팅방 개설) 함수
     */
    const inviteHandler = async (e) => {
        e.preventDefault();
        //console.log('submit', selectedChatInvite);

        await fetch(`/api/room/create/${teamId}/${selectedChatInvite}`, {
            method: 'post',
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
        }).then(
            setModal02IsOpen(false)
        )
        setChangeValue(changeValue + 1);
    }

    /**
     *  채팅방 나가기 함수
     */
    const exitRoom = async (e) => {
        e.preventDefault();
        console.log('exitRoom', e.target.id);
        const delRoomId = e.target.id;
        await fetch(`/api/room/${delRoomId}`, {
            method: 'delete',
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
        })
        setChangeValue(changeValue + 1);
    }

    const notifyKeywordChanged = (keyword) => {
        setKeyword(keyword);
    };


    return (
        <div>
            <div className={stylesChatRoomList.OuterBox}>
            <div className={stylesChatRoomList.Block}>
                <div className={stylesChatRoomList.Title}>Chat</div>
                <button className={stylesChatRoomList.PlusButton} onClick={openChatInviteModal}>+</button>
            </div>
            <div className={stylesChatRoomList.Body}>
                    {
                        chatRooms.map((chatRoom, index) => {
                            const roomName = (chatRoom.title).split("/");
                            return (
                                
                                <div className={stylesChatRoomList.One}>
                                    {
                                        roomName.length == 1 ?
                                        <div>
                                        <NavLink className={stylesChatRoomList.RoomName} to={`/${teamId}/chat/${chatRoom.roomId}`} >
                                            {chatRoom.title}
                                        </NavLink>
                                        <button className={stylesChatRoomList.ExitButton} id={chatRoom.roomId} onClick={exitRoom}> ㅡ </button> 
                                        </div>
                                        :
                                        (
                                            roomName[0] == loginMember.name ? 
                                            <div>
                                        <NavLink className={stylesChatRoomList.RoomName} to={`/${teamId}/chat/${chatRoom.roomId}`} >
                                            {roomName[1]}
                                        </NavLink>
                                        <button className={stylesChatRoomList.ExitButton} id={chatRoom.roomId} onClick={exitRoom}> ㅡ </button> 
                                        </div>
                                        :
                                        <div>
                                        <NavLink className={stylesChatRoomList.RoomName} to={`/${teamId}/chat/${chatRoom.roomId}`} >
                                            {roomName[0]}
                                        </NavLink>
                                        <button className={stylesChatRoomList.ExitButton} id={chatRoom.roomId} onClick={exitRoom}> ㅡ </button> 
                                        </div>
                                        
                                        )
                                     }
                                </div>
                            )
                        })
                    }
            </div>
            </div>
            <Modal
                className={styleChatInvite.Modal}
                isOpen={modal02IsOpen}
                searchUserListResult={searchUserResult}
                onRequestClose={() => setModal02IsOpen(false)}
                contentLabel="modal02 example">
                <div>
                <ChatInviteSearchBar keyword={keyword} callback={notifyKeywordChanged} className={styleChatInvite.InputText} />
                    <form onSubmit={inviteHandler}>
                        <div className={styleChatInvite.Outer} >
                        {
                            searchUserResult
                                .filter(sMember => sMember.name.indexOf(keyword) !== -1)
                                .map((sMember) => {
                                return (
                                    sMember.memberId !== loginMember.id ?
                                        <div >
                                            <label>
                                                <div className={styleChatInvite.One}>
                                                    <Image className={styleChatInvite.Avatar} src={`http://localhost:8080/upload-file/${sMember.avatar}`} />
                                                    <div className={styleChatInvite.UserName}>{sMember.name}</div>
                                                    <input className={styleChatInvite.RadioBox} type='radio' name='selectMember' value={sMember.memberId} onClick={selectChatMember} />
                                                </div>
                                            </label>
                                        </div> : null)
                            })
                        }
                        </div>
                        <Button variant="primary" type="submit" className={styleChatInvite.Button}>
                            채팅방 개설
                        </Button>
                        
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default ChatList;