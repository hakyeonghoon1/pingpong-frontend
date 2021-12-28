import React, { useState } from 'react';
import { useParams } from 'react-router';
import SiteLayout from '../../layout/SiteLayout';
import PostModify from './PostModify';
import PostWrite from './PostWrite';

const PostWork = () => {
    const {teamid, category, postid} = useParams();
    // const [postList, setPostList]=useState([]);
    // const GetPostList=async()=>{        // post리스트 가져오는 useEffect
    //     try {
    //         const response = await fetch(`/api/post/list/${partid}`, {
    //           method: 'get',
    //           mode: 'cors',                           
    //           credentials: 'include',                 
    //           cache: 'no-cache',                           
    //           headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'         
    //           },
    //           redirect: 'follow',                     
    //           referrer: 'client',                       
    //           body: null
    //         })
            
            
    //         const jsonResult = await response.json();
        
    //         setPostList(jsonResult.data.postList);

    //     }catch(err){
    //         console.log(err);
    //     }
       
    // }

    const handlerComponantByCategory=()=>{          //post url 중 category 내용에 따라 contents(layout)에 출력되는 요소를 결정하는 halder
        switch (category) {     
            case 'modify': 
                return <PostModify postid={postid} teamid={teamid}/> 
            case 'write': 
                return <PostWrite partid={postid} teamid={teamid}/> 
            default:
                break;
    }
    }
    return (
       
            <SiteLayout postidforComment={postid}>
                 {handlerComponantByCategory() }
            </SiteLayout>
       
    )

}
export default PostWork;