import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useParams } from 'react-router';
import ListGroup from 'react-bootstrap/ListGroup'
import styles from '../../assets/scss/PostForm.scss';
import moment from 'moment';

const PostForm = ({title, contents,name ,date,id,callback, post , handlerDeletePost,thumbnail}) => {
   let {teamid, partid}=useParams()
   const {openDropdown, setOpenDropdown}=useState(false);
   
    const handlerOnclickCommentDel=async()=>{ 
       
                                       //post 삭제를 위한 함수
            try {
            // Delete
            const response = await fetch(`/api/post/${id}`, {
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
            });

            if (!response.ok) {
            throw `${response.status} ${response.statusText}`;
            }

            const json = await response.json();
            if (json.result !== 'success') {
            throw json.message;
            }
            } catch (err) {
            console.error(err);
            }
            handlerDeletePost(id)      //comment 삭제 후 list 반영을 위해 callback함수 사용.

   }; 

   const handlerOnclickPost=(e)=>{           //선택한 post의 comment 확인을 위해 선택한 정보를 부모 commponent로 돌려주는 handler
      e.preventDefault();
      callback({'Postid':id ,'post':post})
   }
   const handlerOpenDropdown=(e)=>{
      e.preventDefault();
      setOpenDropdown(!openDropdown)
   }
   const FileDownload = async(e) =>{
      
      location.href=`http://localhost:8080/download/${thumbnail}`
      // try {
      //    const response = await fetch(`http://localhost:8080/download/${thumbnail}`, {
      //       method: 'get',
      //       mode: 'cors',                           
      //       credentials: 'include',                 
      //       cache: 'no-cache',                           
      //       headers: {
      //          'Accept': 'application/json',
      //          'Content-Type': 'application/json'         
      //       },
      //       redirect: 'follow',                     
      //       referrer: 'client',                       
      //       body: null
      //    });

      //    } catch (err) {
      //       console.error(err);
      //    }
   }
    return (

           
        <div><br/>
            <div className={styles.PostForm}>
                      
                              
                              <div className={styles.title}>{title}</div>
                              
                              <div className={styles.writer}>{name} </div>
                              <div className={styles.date}>{moment(date).format('YYYY-MM-DD')}</div>
                             
                                 <DropdownButton id="btn btn-secondary btn-sm" size="sm" className={styles.drobDwon}>
                                    <Dropdown.Item onClick={handlerOnclickPost}>댓글</Dropdown.Item>
                                    {JSON.parse(window.sessionStorage.getItem("loginMember")).id === post.member_id &&
                                    <Dropdown.Item onClick={()=>location.href=`/${teamid}/post/modify/${id}`}>수정</Dropdown.Item>
                                    }
                                    {JSON.parse(window.sessionStorage.getItem("loginMember")).id === post.member_id &&
                                     <Dropdown.Item onClick={handlerOnclickCommentDel}>삭제</Dropdown.Item>
                                    }
                                 </DropdownButton>

                                    
                              <br/><br/>
                              
                              <div className={styles.contents}>
                              {
                                 thumbnail !== undefined ?
                                 <div className={styles.download} onClick={FileDownload}>첨부파일 : <a>{thumbnail}</a></div>
                                 :
                                 null
                              }
                                 {contents}
                              </div>
                              

                            
                             
                              
                      
            </div>

            </div>
    );
};

export default PostForm;