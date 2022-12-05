import React from 'react';
import styles from './card.module.scss';
import { BlocksIcon, EaseRowIcon, RowIcon } from '../../Assets/Svg/CardTypes';

const CardControls = ({ setRefControls, handleControls, customElements = [] }) => {
    return (
        <div ref={setRefControls} className={styles.controls} onClick={handleControls}>
            <div data-control="row" className={styles.active}><RowIcon /></div>
            <div data-control="e-row"><EaseRowIcon /></div>
            <div data-control="blocks"><BlocksIcon /></div>
        </div>
    );
};

export default CardControls;