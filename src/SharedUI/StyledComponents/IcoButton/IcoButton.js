import React from 'react';
import styles from './icobutton.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faGear, faDroplet } from '@fortawesome/free-solid-svg-icons';

const IcoButton = ({ title, icon, handler, customStyles = {} }) => {
    return (
        <div className={styles.wrapper} style={customStyles}>
            <FontAwesomeIcon icon={icon} />
            <button onClick={handler}>{title}</button>
        </div>
    );
};

export default IcoButton;