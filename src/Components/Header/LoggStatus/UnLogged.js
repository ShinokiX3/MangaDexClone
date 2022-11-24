import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

const UnLogged = ({ handleAnouthorizeModal }) => {
    return (
        <div className="login-block" onClick={handleAnouthorizeModal}>
            <FontAwesomeIcon icon={faArrowRightToBracket} />
        </div>
    );
};

export default UnLogged;