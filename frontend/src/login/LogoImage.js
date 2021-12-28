import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LogoImage from '../assets/images/logo.jpg';
export default function () {

    const containerStyle= {
        display:"flex",
        margin:"auto",
        border:"1px solid red",
        
        alignItems: 'center'
    }
    const imgStlye={
        display:"flex",
        margin:"auto",
        flexDirection: 'row',  
        alignItems: 'center'
    }
    const stylesLogo ={
        width:"50%",
        margin:"auto"
    }

    return (

        <div style={imgStlye}>
            <Image src={LogoImage} style={stylesLogo} />
        </div>  
    )
}
