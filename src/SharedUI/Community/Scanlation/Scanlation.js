import React from 'react';
import { groupIcons } from '../../../Assets/Svg/Groups';
import { cutString } from '../../../Utils/cutString';
import styles from './scanlation.module.scss';

const Scanlation = ({ name }) => {
    return (
        <div className={styles.wrapp}>
            <img src={groupIcons.group} alt=""></img>
            <p style={{marginLeft: '4px', padding: '0px 4px'}}>{cutString(name, 18)}</p>
        </div>
    );
};

export default Scanlation;