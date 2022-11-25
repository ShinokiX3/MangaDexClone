import React from 'react';
import './loginModal.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faGear, faDroplet } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ setActive }) => {
    const navigate = useNavigate();

    const handleAuthorized = (type) => {
        navigate(`/${type}`);
        setActive(false);
        document.body.style.overflow = "";
    }

    return (
        <div className="login-modal">
            <div className="login-settings">
                <div className="">
                    <FontAwesomeIcon icon={faGear} />
                    <p>Settings</p>
                </div>
                <div className="">
                    <FontAwesomeIcon icon={faDroplet} />
                    <p>Theme</p>
                </div>
            </div>
            <hr />
            <div className="login-var">
                <button onClick={() => handleAuthorized('singin')}>Login</button>
                <button onClick={() => handleAuthorized('singup')}>Register</button>
            </div>
        </div>
    );
};

export default LoginModal;