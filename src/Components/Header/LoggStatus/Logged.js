import React, { useState } from 'react';
import styles from './logged.module.scss';
import avatar from '../../../Assets/Images/avatar.png';
import Modal from '../../../Features/Modal/Modal';
import UserModal from '../../Modals/UserModal/UserModal';

const Logged = () => {
    const [shouldOpen, setShouldOpen] = useState(false);

    const handleModal = () => {
        setShouldOpen(true);
    }

    return (
        <>
        <div className="login-block" onClick={handleModal}>
            <img className={styles.avatar} src={avatar} alt="avatar" />
        </div>

        <Modal active={shouldOpen} setActive={setShouldOpen} 
            styleModal={{ backdropFilter: 'initial' }} 
            styleModalContent={{ position: 'fixed', top: '7.5%', right: '2.5%', minWidth: '244px', paddingLeft: '24px', paddingRight: '24px' }}>
            <UserModal active={shouldOpen} setActive={setShouldOpen} />
        </Modal>
        </>
    );
};

export default Logged;