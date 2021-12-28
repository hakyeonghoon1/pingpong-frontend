import React, { useState, useEffect } from 'react';
import styles from '../assets/css/LoginForm.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router-dom';

const FindIdForm = () => {

    const [formInfo, setFormInfo] = useState({
        'name': '',
        'phone': ''
    });
    const [email, setEmail] = useState();

    const styleBtnDiv = {
        border: '1px solid blue',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }

    const styles1 = {
        width: '35vh'
    }

    const styles2 = {
        fontWeight: 'bold',
        textDecoration: 'none'
    }

    const styles3 = {
        width: '35vh'
    }

    const styles4 = {
        marginTop:'10%',
        marginBottom:'10%',
        width: '35vh'
    }

    const chgForm = (e)=>{
        let { name, value } = e.target;

        setFormInfo({
        ...formInfo,
        [name]: value,
        });

    
    }

    /**
     *  이메일 찾기 함수
     */
    const handlerSubmit = async (e)=>{
        e.preventDefault();

        try {
            const response = await fetch(`/api/member/findId`, {
                method: 'post',
                mode: 'cors',                          // no-cors, cors, same-origin
                credentials: 'include',                // include, omit, same-origin
                cache: 'no-cache',                     // no-cache, reload, force-cache, default*
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                redirect: 'follow',                    // follow*, error, manual(response.url)
                referrer: 'client',                    // no-refferer, *client
                body: JSON.stringify(formInfo)
            });

            const jsonResult = await response.json();
    
            if(jsonResult.data==null){
                alert('일치하는 사용자가 없습니다.');
                return;
            } else{
                setEmail(jsonResult.data.email);
            }



        } catch (err) {
            console.error(err);
        }
    }

    /**
     *  로그인 페이지로 이동
     */
    const moveLogin =(e)=>{
        location.href='/login';
    }

    return (
        <div>
            <div className={styles.LoginForm}>
                {
                email == null ?    
                <Form onSubmit={handlerSubmit} style={styles1}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label >이름</Form.Label>
                        <Form.Control type="text" placeholder="Name" name='name' onChange={chgForm} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>전화번호</Form.Label>
                        <Form.Control type="text" placeholder="Phone" name='phone' onChange={chgForm} />
                    </Form.Group>
       
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Button variant="primary" type="submit" style={styles3} >
                        ID찾기
                    </Button>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Button variant="primary" type="button" style={styles3} onClick={moveLogin}>
                    로그인
                    </Button>
                    </Form.Group>

                </Form>
                :
                <div>
                <div style={styles4}> 귀하의 이메일은 {email} 입니다.</div>
                <Button variant="primary" type="button" style={styles3} onClick={moveLogin}>
                    로그인
                </Button>
                </div>
                }
            </div>
        </div>
    );
};

export default FindIdForm;