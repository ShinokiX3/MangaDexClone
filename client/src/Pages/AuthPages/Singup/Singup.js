import React from 'react';
import './singup.scss';

import Form from '../../../SharedUI/Form/Form';
import Input from '../../../SharedUI/Form/Input';
import CheckBox from '../../../SharedUI/Form/CheckBox';
import Buttons from '../../../SharedUI/Form/Buttons';
import { useNavigate } from 'react-router-dom';

const Singup = () => {
    const navigate = useNavigate();
    const handleSingin = () => {
        navigate(`/singin`);
    }
    return (
        <Form type={"Create Account"} additional={"Your username must be unique and will be visible to other users."}>
            <Input type={"text"} id={"username"} placeholder={"Username"} />
            <Input type={"email"} id={"email"} placeholder={"Email"} />
            <Input type={"email"} id={"r_email"} placeholder={"Repeat email"} />
            <Input type={"password"} id={"password"} placeholder={"Password"} />
            <Input type={"password"} id={"r_password"} placeholder={"Repeat password"} />
            <CheckBox 
                message={"Created an account already and need to activate it?"} 
                additionalMess={"Click here."}
                value={"I have read and accept the"}
                additionalButt={"Rules"} 
            />
            <Buttons>
                <button>Create Accaunt</button>
                <button onClick={handleSingin}>Log In Instead</button>
            </Buttons>
            <p style={{color: "#494949"}}>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
        </Form>
    );
};

export default Singup;