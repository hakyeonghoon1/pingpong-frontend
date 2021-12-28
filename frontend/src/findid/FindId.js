import React from 'react';
import LogoImage from '../login/LogoImage';
import FindIdForm from './FindIdForm';
const FindId = () => {
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
        marginTop:'5%',
        width:'70vh',
        height:'75vh',
        //border:'1px solid green',
        padding:'3%',
        backgroundColor:'white',
        boxShadow:'0px 5px 5px 0px gray'
    }
    const style3 ={
        //border:'1px solid red',
        margin:'auto',
        textAlign:'center',
        fontFamily:'Times New Roman',
        fontWeight:'bold'
    }
    return (
        <div style={styles}>
            <div style={styles2}>
            <h1 style={style3}>ID찾기</h1>
                <LogoImage/>
                <FindIdForm/>
            </div>
        </div>
    );
};

export default FindId;