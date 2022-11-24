import React from 'react';
import styles from '../auth.module.scss';

import Form from '../../../SharedUI/Form/Form';
import Input from '../../../SharedUI/Form/Input';
import Buttons from '../../../SharedUI/Form/Buttons';
import CheckBox from '../../../SharedUI/Form/CheckBox';
import { useNavigate } from 'react-router-dom';
import MainContainer from '../../../Layouts/MainContainer/MainContainer';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../Store/Slices/userSlice';

const Singin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    
    const handleSingup = () => {
        navigate(`/singup`);
    }

    const handleSubmit = () => {
        if (!username || !password || checkbox === false) return false;

        const creds = {
            username: username,
            password: password
        };

        (async () => {
            const resp = await fetch(`https://api.mangadex.org/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(creds)
            })
            .then(data => data.json());

            if (resp.result === 'ok') {
                const expires = new Date().valueOf() + 15 * 60000;

                const user = {
                    username,
                    expires,
                    sessionToken: resp.token.session,
                    refreshToken: resp.token.refresh
                }

                localStorage.setItem('user', JSON.stringify(user));

                dispatch(setUser(user));
                navigate(`/`);
            }

        })();

    }

    return (
        <MainContainer mainClasses={styles.flexcenter} isHeaderBlack>
            <Form type={"Log In"}>
                <Input type={"text"} id={"username"} placeholder={"Username"} value={username} setValue={setUsername} />
                <Input type={"password"} id={"password"} placeholder={"Password"} value={password} setValue={setPassword} />
                <span className={styles.spansettings}>
                        Forgot Username/Password
                </span>
                <CheckBox value={"Remember Me"} checked={checkbox} setChecked={setCheckbox} />
                <Buttons>
                    <button onClick={handleSubmit}>Log In</button>
                    <button onClick={handleSingup}>Create an Account</button>
                </Buttons>
            </Form>
        </MainContainer>
    );
};

export default Singin;