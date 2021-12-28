import React, { useState, useEffect,useRef } from 'react';
import SiteLayout from '../../layout/SiteLayout';
import stylesComment from '../../assets/css/Comment.css'
import CommentForm from '../Main/CommentForm';
import Button from 'react-bootstrap/Button';

const Comment = ({ postforComment ,  onHandlerNavLeftChange}) => {       //
    const postId = postforComment.post_id

    const [commentList, setCommentList] = useState([]);
    const [commentDelid, setCommentDelid] = useState('');
    const [commentAdd, setCommentAdd] = useState(false);
    const [comment, setComment] = useState('');
    const textRef = useRef();


    useEffect(async () => {        // Commnet 리스트 가져오는 useEffect
        setCommentAdd(false);
        try {
            const response = await fetch(`/api/comment/${postforComment.post_id}`, {
            // const response = await fetch(`/api/comment/1`, {
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
            console.log('commentlist',jsonResult);
            setCommentList(jsonResult.data.commentList);

        } catch (err) {
            console.log(err);
        }

    }, [postId, commentDelid, commentAdd]);

    const handlerOnclickCommentAdd = async (e) => {     //comment 작성 후 list reloading을 위한 handler
        e.preventDefault();

        console.log("part 추가 in:", comment);
        try {
            const response = await fetch(`/api/comment/${postforComment.post_id}`, {
                // const response = await fetch(`/api/comment/1`, {

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
                body: JSON.stringify({ 'contents': comment })
            })
            
            textRef.current.reset();
        } catch (err) {
            console.log(err);
        }
        setCommentAdd(true)
    }
   

    const handlerOnclickCommentDel = (commentId) => {       //comment 삭제 후 list reloading을 위한 handler
        setCommentDelid(commentId)
    }

    const chgComment = (e) => {        //comment 입력값 세팅하는 부분

        setComment(e.target.value);
    }

    return (

        <div className='Comment'>
            {
           // <input type='button' onClick={onHandlerNavLeftChange} value='x'/>
            }
            <div className={stylesComment.OuterBox}>
                <div className={stylesComment.InnerBox}>
                <div className={stylesComment.Post}>        {//show target post. 추가적 배치 필요.  
                }
                    <div className={stylesComment.PostTitle}>{postforComment.title}</div>
                    <div className={stylesComment.PostContents}>{postforComment.contents}</div>


                </div>
                <br />
                {/**comment list  */}
                {commentList
                    .map((comment, index) => {
                        return <CommentForm
                            key={index}
                            id={comment.comment_id}
                            member_id={comment.member_id}
                            contents={comment.contents}
                            name={comment.name}
                            date={comment.date}
                            post_id={comment.post_id}
                            callback={handlerOnclickCommentDel}
                        />
                    })

                }
                </div>
                <div className={stylesComment.Form}>
                    <form onSubmit={handlerOnclickCommentAdd} ref={textRef}>           {/**comment add  */}
                        <input type='text' name='comment' onChange={chgComment} className={stylesComment.InputText} ></input>
                        {/*<input type='submit' autoComplete={'off'} name='commnet' onChange={chgComment} />*/}
                        <Button type="submit" className={stylesComment.Button} name='comment' onChange={chgComment}>
                        작성
                        </Button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Comment;