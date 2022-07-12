import React from 'react';
import styles from './keyvalues.module.scss';

const Keyvalues = ({ tagObj = {} }) => {
    return (
        <div style={{width: 'fit-content'}} className={styles.tag_block} >
            <div className={styles.name}>
                <span>{tagObj.name}</span>
            </div>
            <div style={{display: 'flex'}} className={styles.tag_elements}>
                {
                    tagObj.values.map((el, idx) => {
                        return (
                            <span key={el?.attributes?.name + idx}>
                                {
                                    typeof(el?.attributes?.name) === 'string' ? el?.attributes?.name : el?.attributes?.name?.en
                                }
                            </span>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Keyvalues;