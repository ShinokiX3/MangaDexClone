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
                <div onClick={modalClose} className="modal-close">
                    <svg data-v-20f285ec="" data-v-6b3fd699="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-currentColor icon"><path data-v-20f285ec="" d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
                {children}
            </div>
        </div>
    );
});

export default Modal;