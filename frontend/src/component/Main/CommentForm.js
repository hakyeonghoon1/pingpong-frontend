import React from 'react';
import stylesComment from '../../assets/css/Comment.css';
const CommentForm = (props) => {
    const loginMember = JSON.parse(window.sessionStorage.getItem("loginMember"));
    console.log('props',props.member_id,'memberid',loginMember.id)
    const handlerOnclickCommentDel=async()=>{ 
       
            //comment 삭제
            try {
            // Delete
            const response = await fetch(`/api/comment/${props.id}`, {
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


            // fetch success?
            if (!response.ok) {
            throw `${response.status} ${response.statusText}`;
            }

            // API success?
            const json = await response.json();
            if (json.result !== 'success') {
            throw json.message;
            }


            } catch (err) {
            console.error(err);
            }

            props.callback(props.id)

    };
    return (
        <div className={stylesComment.CommentBox}>
            <div className={stylesComment.Block2}>
            <div className={stylesComment.Writer}>{props.name}</div>
            <div className={stylesComment.Date}>{props.date}
                {
                    Number(props.member_id) == Number(loginMember.id) ?<button onClick={handlerOnclickCommentDel} className={stylesComment.DelButton}>삭제</button>
                    :
                    null
                }
            </div>
            </div>    
            <div className={stylesComment.WhiteBox}>
                <div className={stylesComment.Contents}>{props.contents}</div>
            </div>
                
         </div>
    )
};

export default CommentForm;