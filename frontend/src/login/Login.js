import React, {useState, useEffect} from 'react';
import LoginForm from './LoginForm';
import LogoImage from './LogoImage';
import { NavLink, useParams } from 'react-router-dom';

export default function() {
    
    const styles ={
        margin:'auto',
        width:'100%',
        height:'100vh',
        border:'1px solid #efefef',
        backgroundColor:'#efefef',
        
    }
    
    const styles2 ={
        borderRadius:'10px',
        margin:'auto',
        marginTop:'5%',
        width:'70vh',
        height:'75vh',
        padding:'3%',
        backgroundColor:'white',
        boxShadow:'0px 5px 5px 0px gray',
        alignItems: 'center'
    }

    const style3 ={
        margin:'auto',
        textAlign:'center',
        fontFamily:'Times New Roman',
        fontWeight:'bold'
    }

    return (
        <div className='User' style={styles}>
            <div style={styles2}>
            <h1 style={style3}>로그인</h1>
                <LogoImage/>
                <LoginForm/>
            </div>
        </div>
    )
}