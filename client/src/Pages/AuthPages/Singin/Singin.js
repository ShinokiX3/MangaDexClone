import React from 'react';
// import '../AuthPages/Singup/singup.scss';

import Form from '../../../SharedUI/Form/Form';
import Input from '../../../SharedUI/Form/Input';
import Buttons from '../../../SharedUI/Form/Buttons';
import CheckBox from '../../../SharedUI/Form/CheckBox';
import { useNavigate } from 'react-router-dom';

const Singin = () => {
    const navigate = useNavigate();
    const handleSingup = () => {
        navigate(`/singup`);
    }
    return (
        <main>
        <Form type={"Log In"}>
            <Input type={"text"} id={"username"} placeholder={"Username"} />
            <Input type={"password"} id={"password"} placeholder={"Password"} />
            <span style={{color: "red", fontSize: "14pt", alignSelf: "flex-start", cursor: "pointer", marginBottom: "18px"}}>
                    Forgot Username/Password
            </span>
            <CheckBox value={"Remember Me"} />
            <Buttons>
                <button>Log In</button>
                <button onClick={handleSingup}>Create an Account</button>
            </Buttons>
        </Form>
        </main>
    );
};

export default Singin;