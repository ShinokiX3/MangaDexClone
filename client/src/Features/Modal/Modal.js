import { memo, useCallback } from 'react';
import './modal.scss';

const Modal = memo(({active, setActive, children, styleModal = {}, styleModalContent = {}, modalContentAdd = ''}) => {
    
    const modalClose = useCallback(() => {
        setActive(false); 
        document.body.style.overflow = "";
        document.body.style.paddingRight = "0px";
    }, [])

    return (
        <div className={active ? "modal-window active-modal" : "modal-window"} 
            onClick={modalClose} 
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
});

export default Modal;