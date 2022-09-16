import React from 'react';
import styles from './card.module.scss';
import { BlocksIcon, EaseRowIcon, RowIcon } from '../../Assets/Svg/CardTypes';

const CardControls = ({ setRefControls, handleControls, customElements = [] }) => {
    return (
        <div ref={setRefControls} className={styles.controls} onClick={handleControls}>
            {/* {!customElements ?
                <>
                    <div data-control="row" className={styles.active}><RowIcon /></div>
                    <div data-control="e-row"><EaseRowIcon /></div>
                    <div data-control="blocks"><BlocksIcon /></div>
                </>
                :
                <>{
                    customElements.map((el, idx) => 
                        <div 
                            style={{
                                margin: '5px', 
                                padding: '5px 15px 5px 15px', 
                                width: 'fit-content', 
                                height: 'fit-content',
                                fontSize: '13pt'
                            }} 
                            data-control={el} 
                            className={idx === 0 ? styles.active : ''}>
                                {el}
                        </div>
                    )
                }</>
            } */}
            <div data-control="row" className={styles.active}><RowIcon /></div>
            <div data-control="e-row"><EaseRowIcon /></div>
            <div data-control="blocks"><BlocksIcon /></div>
            {/* style={{width: 'auto', height: 'auto', marginRight: '0px', padding: '7px 14px 7px 14px'}} */}
        </div>
    );
};

export default CardControls;