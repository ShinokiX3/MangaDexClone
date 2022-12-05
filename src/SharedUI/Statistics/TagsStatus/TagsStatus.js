import React from 'react';
import styles from './tags-status.module.scss';

const TagsStatus = ({ tags, amount, customStyles = {} }) => {
    const colorage = (tag) => {
        const colorage = {
            'GORE': 'red',
            'SEXUAL VIOLENCE': 'red',
            'SUGGESTIVE': 'orange',
            'default': 'default'
        }
        return colorage[tag] || colorage['default'];
    }

    return (
        <div className={styles.manga_tags}>
            {tags?.map((el, idx) => {
                    if (idx < amount) {
                        return (
                            <span 
                                className={styles[colorage((el?.attributes?.name?.en).toUpperCase())]}
                                style={customStyles} 
                                key={el?.attributes?.name?.en}> 
                                    {el?.attributes?.name?.en}
                            </span>
                        )
                    } else if (idx === amount) {
                        return <span className={styles.more} key={el?.attributes?.name?.en}>MORE</span>
                    } else return null
                })
            }
        </div>
    );
};

export default TagsStatus;