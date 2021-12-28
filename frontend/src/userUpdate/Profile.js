import React, { useState, useEffect } from "react";
import UserInfo from "./UserInfo";
import UserUpdateForm from "./UserUpdateForm";
import Invitation from "../component/Main/Invitation";

const UserUpdate = ({inviteMessage, onHandlerNavLeftChange}) => {
  const [profile, setProfile] = useState(window.sessionStorage.getItem("loginMember"));
  const [formInfo, setFormInfo] = useState([]);
  const [profileComponentChange, setProfileComponent]=useState(false);
  const [alram, setAlram] = useState(inviteMessage);
  
  const chgForm = (e) => {

      let { name, value } = e.target;

      setFormInfo({
      ...formInfo,
      [name]: value,
      });
      
      console.log(formInfo);

  };
  
  useEffect(async () => {
   

      try{
          const response = await fetch('/api/member/edit', {          //로그인한 회원의 회원정보를 가져오는 부분 
              method: 'get',
              mode:'cors',                         
              credentials:'include',                
              cache:'no-cache',                    
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              redirect:'follow',                   
              referrer:'client',                   
              body: null
          });

          const jsonResult = await response.json();
          if(jsonResult.result !== 'success') {
          throw new Error(`${jsonResult.result} ${jsonResult.message}`);
          }
          setFormInfo({'name':jsonResult.data.name,'imageFile':jsonResult.data.imageFile, 'email':jsonResult.data.email, 'phone':jsonResult.data.phone, 'company':jsonResult.data.company});
          
      } catch(err){

      }
  },[profileComponentChange]);
  const styles ={
      backgroundImage:formInfo.avatar
  }
 
  const handlerOnChangeComponent=()=>{
      console.log('profile page change button click!!')
      setProfileComponent(!profileComponentChange)
  }
  


  return (
    <div>
      {  
        //수정중. 버튼을 누르면 보기(UserInfo)/수정(UserUpdateForm)  화면으로 전환시킬 예정
        //<UserInfo profile={profile}/>
        //console.log('user update in : ', profile)
      }
      <br />

      {profileComponentChange===false?<UserInfo profile={profile} handlerOnChangeComponent={handlerOnChangeComponent}/>:<UserUpdateForm profile={profile}  /*FileInput={FileInput} */ profile={profile}  handlerOnChangeComponent={handlerOnChangeComponent}/>
      //<UserUpdateForm /*FileInput={FileInput} */profile={profile} />
      }
     

    </div>
  );
};

export default UserUpdate;
