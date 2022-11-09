import React from 'react';
import styles from '../auth.module.scss';

import Form from '../../../SharedUI/Form/Form';
import Input from '../../../SharedUI/Form/Input';
import Buttons from '../../../SharedUI/Form/Buttons';
import CheckBox from '../../../SharedUI/Form/CheckBox';
import { useNavigate } from 'react-router-dom';
import MainContainer from '../../../Layouts/MainContainer/MainContainer';

const Singin = () => {
    const navigate = useNavigate();
    const handleSingup = () => {
        navigate(`/singup`);
    }
    return (
        <MainContainer mainClasses={styles.flexcenter} isHeaderBlack>
            <Form type={"Log In"}>
                <Input type={"text"} id={"username"} placeholder={"Username"} />
                <Input type={"password"} id={"password"} placeholder={"Password"} />
                <span className={styles.spansettings}>
                        Forgot Username/Password
                </span>
                <CheckBox value={"Remember Me"} />
                <Buttons>
                    <button>Log In</button>
                    <button onClick={handleSingup}>Create an Account</button>
                </Buttons>
            </Form>
        </MainContainer>
    );
};

export default Singin;