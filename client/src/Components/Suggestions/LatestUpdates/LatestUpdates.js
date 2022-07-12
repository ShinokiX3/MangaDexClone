import React, { useEffect, useState } from 'react';
import styles from './latest-updates.module.scss';
import Img from '../../StyledComponents/Img/Img';
import { filterSomeAttribute } from '../../../Commons/filterAttribute';
import { cutString } from '../../../Commons/cutString';
import { flags } from '../../../Assets/Svg/Flags';
import Scanlation from '../../Community/Scanlation/Scanlation';
import { compareDates } from '../../../Commons/compareDates';

const LatestUpdates = ({ chapters }) => {
    console.log(chapters);
    return (
        <div className={styles.wrapp}>
            {
                chapters?.data?.map(chapter => <LatestUpdatesItem chapter={chapter} />)
            }
        </div>
    );
};

const LatestUpdatesItem = ({ chapter }) => {
    return (
        <div className={styles.item}>
            <div className={styles.img_wrapp}>
                <Img 
                    src={
                        `https://uploads.mangadex.org/covers/${filterSomeAttribute(chapter?.relationships, 'manga')?.id}/${filterSomeAttribute(chapter?.relationships, 'cover_art', 'fileName')}`
                    } 
                    alt='' 
                    classes={styles.img_wrapp} 
                />
            </div>
            <div className={styles.info}>
                <div>
                    <p className={styles.title}>
                        {cutString(filterSomeAttribute(chapter?.relationships, 'manga', 'title')?.en, 36)}
                    </p>
                </div>
                <div className={styles.translation}>
                    <img src={flags[chapter?.attributes?.translatedLanguage]} alt="" />
                    <p>
                        {
                            cutString(`Vol. ${chapter?.attributes?.volume || 0} Ch. ${chapter?.attributes?.chapter || 0} - ${chapter?.attributes?.title || 'Untitled chapter'}`, 45)
                        }
                    </p>
                </div>
                <div className={styles.scanlation}>
                    <Scanlation name={filterSomeAttribute(chapter?.relationships, 'scanlation_group', 'name')} />
                    <p>{ compareDates(chapter?.attributes?.updatedAt) }</p>
                </div>
            </div>
        </div>
    )
}

export default LatestUpdates;