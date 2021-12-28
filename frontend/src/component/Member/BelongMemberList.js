import React, { useEffect, useState } from 'react';
import Modal from "react-modal";
import Members from './Members';
import styleTeamMemberInvite from '../../assets/css/TeamMemberInvite.css';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import stylesMemberBox from '../../assets/css/MemberBox.css';

const BelongMemberList = ({ teamId }) => {

    // 팀 초대시 유저검색 결과
    const [searchUserResult2, setSearchUserResult2] = useState([]);
    // 체크박스 체크된 ID
    const [checkedId, setCheckedId] = useState(new Array());
    // 모달 상태
    const [modal03IsOpen, setModal03IsOpen] = useState(false);

    //sampleImage
    const profileImage = 'Im0.jpg';
    //member 초대시 member 검색 onChange 함수
    const memberSearch = async (e) => {

        let { name, value } = e.target;

        if (value == "") {
            value = "%%";
        }

        console.log(name, value);
        const response = await fetch(`/api/team/searchUser/${teamId}`, {
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
            body: value
        });

        const data = await response.json();
        const findUserLists = data.data.findUserList;
        console.log('result', findUserLists);
        setSearchUserResult2(findUserLists);
    }

    const submitTeamMemberInvite = async (e) => {
        e.preventDefault();

        const response = await fetch(`/api/team/invite/${teamId}`, {
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
            body: JSON.stringify({"members":checkedId})
          });
        for(let i = 0;i<checkedId.length;i++){
            sendMessage(checkedId[i]);
        }
        setCheckedId(new Array());
        setModal03IsOpen(false);
    }
    
    //member 추가 모달 창 열기
    const teamMemberInvite = async (e) => {
        e.preventDefault();
        setModal03IsOpen(true);
        const value = "%%";
        const response = await fetch(`/api/team/searchUser/${teamId}`, {
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
            body: value
        });
        const data = await response.json();
        const findUserLists = data.data.findUserList;
        console.log('result', findUserLists);
        setSearchUserResult2(findUserLists);

    }

    const checkboxChg = (e) =>{
        //e.preventDefault();
        if(e.target.checked){
            checkedId.push(e.target.id);
            setCheckedId(checkedId);
        } else if( !e.target.checked && checkedId.includes(e.target.id)){
            checkedId.pop(e.target.id);
            setCheckedId(checkedId);
        }
        console.log(checkedId);
    }

    const sendMessage = async(receiver) =>{
        await fetch(`http://localhost:8080/wsInvite/1/${receiver}`, {
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
    }

    return (
        <div>
            <div className={stylesMemberBox.OuterBox}>
                <div className={stylesMemberBox.Block}>
                    <div className={stylesMemberBox.Title}>Member</div>
                    <button className={stylesMemberBox.PlusButton} onClick={teamMemberInvite}>+</button>
                </div>
                <ul className={stylesMemberBox.Ul}>
                    <Members teamId={teamId}/>
                </ul>
            </div>
            
            <Modal
                className={styleTeamMemberInvite.Modal}
                isOpen={modal03IsOpen}
                onRequestClose={() => setModal03IsOpen(false)}
                contentLabel="modal03 example">
                <div>
                    <input type='text' name='memberName' onChange={memberSearch} placeholder='초대할 유저의 이름을 입력해주세요.' className={styleTeamMemberInvite.InputText}/>
                    <form onSubmit={submitTeamMemberInvite}>
                        <div className={styleTeamMemberInvite.Outer}>
                        {
                            searchUserResult2.map((userList) => {
                                return (
                                    <label>
                                        <div className={styleTeamMemberInvite.One}>
                                            <Image className={styleTeamMemberInvite.Avatar} src={`http://localhost:8080/upload-file/${userList.avatar}`} />
                                            <div className={styleTeamMemberInvite.UserName}>{userList.name}</div>
                                            <div className={styleTeamMemberInvite.Company}>{!userList.company ? `소속 없음` : userList.company}</div>
                                            <input type='checkbox' name='member' id={userList.member_id} onClick={checkboxChg}/>
                                        </div>
                                    </label>
                                )
                            })
                        }
                        </div>
                        <Button variant="primary" type="submit" className={styleTeamMemberInvite.Button}>
                            초대하기
                        </Button>
                    </form>
                </div>
            </Modal>
        </div>

    );
};

export default BelongMemberList;