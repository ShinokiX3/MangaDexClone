import React from 'react';
import Button from '../../SharedUI/StyledComponents/Button/Button';
import styles from './commlay.module.scss';

const ButtonsBlock = (buttons = []) => {
    return (
        <div className={styles.usercontrols}>
            <Button customStyles={{backgroundColor: '#ff6740', color: 'white'}} disable>Follow</Button>
            <Button disable>Message</Button>
            <Button>Block</Button>
            <Button>Report</Button>
        </div>
    );
};

export default ButtonsBlock;