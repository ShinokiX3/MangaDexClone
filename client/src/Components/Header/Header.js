import React, { useState, useEffect, memo } from 'react';
import './header.scss';

import { SearchModal, LoginModal } from '../Modals';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from 'react-redux';
import { setHeaderRef, setMainMenuStatus } from '../../Store/userReducer';

import Modal from '../../Features/Modal/Modal';
import Logo from '../../SharedUI/Logo/Logo';

const Header = memo(() => {
    const [active, setActive] = useState(false);
    const [logModal, setLogModal] = useState(false);
    const [ref, setRef] = useState(null);

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleModal = () => {
        setActive(true);
        dispatch(setMainMenuStatus(false));
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "5px";
    }

    const handleAnouthorizeModal = () => {
        setLogModal(true);
        dispatch(setMainMenuStatus(false));
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "5px";
    }

    const handleMenu = (status) => {
        dispatch(setMainMenuStatus(status));
    }

    return (
        <>
        <div ref={setRef} className="header-block header-white">
            <Logo handleMenu={() => handleMenu(true)} ico={{side: 'left', type: 'open'}} />
            <div className="right-links_wrapp">
                <div className="search-block" onClick={handleModal}>
                    <span className="">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        Search
                    </span>
                </div>
                <div className="login-block" onClick={handleAnouthorizeModal}>
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                </div>
            </div>
            <Modal active={active} 
                setActive={setActive}
            >
                <SearchModal setActive={setActive}/>
            </Modal>
            
            <Modal active={logModal} 
                setActive={setLogModal} 
                styleModalContent={{position: 'fixed', top: '10%', right: '5%'}}
            >
                <LoginModal setActive={setLogModal} />
            </Modal>
        </div>
        </>
    );
});

export default Header;