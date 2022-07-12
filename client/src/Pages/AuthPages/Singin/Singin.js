import React from 'react';
// import '../AuthPages/Singup/singup.scss';

import Form from '../../../Components/Form/Form';
import Input from '../../../Components/Form/Input';
import Buttons from '../../../Components/Form/Buttons';
import CheckBox from '../../../Components/Form/CheckBox';
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