import React from 'react';
import styles from './icobutton.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';

const IcoButton = ({ title, icon, handler, url = '', customStyles = {} }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.wrapper} style={customStyles}>
            <FontAwesomeIcon icon={icon} />
            <button onClick={handler ? handler : () => navigate(url)}>{title}</button>
        </div>
    );
};

export default IcoButton;