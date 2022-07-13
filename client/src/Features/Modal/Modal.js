import React from 'react';
import './modal.scss';

const Modal = ({active, setActive, children, styleModal = {}, styleModalContent = {}, modalContentAdd = ''}) => {
    return (
        <div className={active ? "modal-window active-modal" : "modal-window"} 
            onClick={() => { 
                setActive(false); 
                document.body.style.overflow = "";
                document.body.style.paddingRight = "0px";
            }} 
            style={styleModal}
        >
            <div className={active ? "modal-content active-modal" : "modal-content"} 
                onClick={e => e.stopPropagation()}
                style={styleModalContent}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;