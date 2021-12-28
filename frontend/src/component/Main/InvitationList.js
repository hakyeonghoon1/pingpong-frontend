import React, {useState, useEffect,useRef} from 'react';
import Invitation from './Invitation';
import SockJsClient from 'react-stomp';
import styles from '../../assets/scss/Invitation.scss'


const InvitationList = () => {
    const [invitationList, setInvitationList]=useState([]);
    const [invitationAnswer, setInvitationAnswer]=useState(false);
    const $websocket = useRef(null);
    const [inviteMessage, setInviteMessage] = useState(0);
    const loginMember = JSON.parse(window.sessionStorage.getItem("loginMember"));
    

    useEffect(async()=>{        // 초대장 리스트 가져오는 useEffect
       
        try {
            const response = await fetch(`/api/team/invite`, {
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

            const jsonResult = await response.json();
            setInvitationList(jsonResult.data);

        }catch(err){
            console.log(err);
        }
       
    },[invitationAnswer,inviteMessage]);

    const handlerOnclickInvitationAnswer=()=>{       //comment 삭제 후 list reloading을 위한 handler
        setInvitationAnswer(!invitationAnswer) 
     }
     

    return (
        <div className={styles.OuterBox}>
              <SockJsClient url="http://localhost:8080/ws-stomp"
                topics={[`/sub/${loginMember.id}`]}
                onMessage={msg => { setInviteMessage(inviteMessage+1); console.log(inviteMessage); alert('초대장이 도착했습니다.');}} ref={$websocket} />
                                                   {/**Invitation list  */}
                {invitationList.map((invitation, index)=>{return <Invitation
                                                                key={index} 
                                                                invitation={invitation}
                                                                callback={handlerOnclickInvitationAnswer}
                />})

                }
        </div>
    );
};

export default InvitationList;