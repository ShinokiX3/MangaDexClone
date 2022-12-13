import React, { useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMainStatus } from '../../Store/Slices/menuSlice';

import './header.scss';

import { SearchModal, LoginModal } from '../Modals';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

import Modal from '../../Features/Modal/Modal';
import Logo from '../../SharedUI/Logo/Logo';
import Logged from './LoggStatus/Logged';

const Header = memo(() => {
    const [active, setActive] = useState(false);
    const [logModal, setLogModal] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const handleModal = () => {
        setActive(true);
        dispatch(setMainStatus(false));
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "5px";
    }

    const handleAnouthorizeModal = () => {
        setLogModal(true);
        dispatch(setMainStatus(false));
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "5px";
    }

    const handleMenu = () => {
        dispatch(setMainStatus(true));
    }

    return (
        <>
        <div className="header-block header-white">
            <Logo handleMenu={handleMenu} ico={{side: 'left', type: 'open'}} />
            <div className="right-links_wrapp">
                <div className="search-block" onClick={handleModal}>
                    <span className="serach-block-ico">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
                    <p>Search</p>
                </div>
                {!user.username 
                    ? <div className="login-block" onClick={handleAnouthorizeModal}>
                        <FontAwesomeIcon icon={faArrowRightToBracket} />
                        </div>
                    : <Logged />
                }
            </div>
            <Modal active={active} setActive={setActive}>
                <SearchModal setActive={setActive}/>
            </Modal>
            
            <Modal active={logModal} setActive={setLogModal} styleModalContent={{position: 'fixed', top: '10%', right: '5%'}}>
                <LoginModal setActive={setLogModal} />
            </Modal>
        </div>
        <div className='header-plug' style={{postion: 'fixed', top: '0px', height: '1px'}} />
        </>
    );
});

export default Header;