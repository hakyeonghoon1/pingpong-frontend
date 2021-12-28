import React from 'react';
import LogoImage from '../login/LogoImage';
import JoinForm from './JoinForm';

const Join = () => {
    const styles ={
        margin:'auto',
        width:'100%',
        height:'100vh',
        border:'1px solid #efefef',
        backgroundColor:'#efefef'
    }
    const styles2 ={
        borderRadius:'10px',
        margin:'auto',
        marginTop:'1%',
        width:'70vh',
        height:'95vh',
        padding:'2%',
        backgroundColor:'white',
        boxShadow:'0px 5px 5px 0px gray'
    }
    const styles3 ={
        margin:'auto',
        textAlign:'center',
        fontFamily:'Times New Roman',
        fontWeight:'bold'
    }
    return (
        <div className='User' style={styles}>
            <div style={styles2}>
                <h2 style={styles3}>회원가입</h2>
                <LogoImage/>
                <JoinForm/>
            </div>

        </div>
    );
};

export default Join;