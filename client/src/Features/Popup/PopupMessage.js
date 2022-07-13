import React from 'react';
import './popupMessage.scss';

const PopupMessage = ({children}) => {
    return (
        <div className="message">
            {children}
        </div>
    );
};

export default PopupMessage;