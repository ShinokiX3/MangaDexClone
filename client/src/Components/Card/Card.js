import React, { memo, useEffect, useState } from 'react';
import MangaDexApi from '../../Services/MangaDexApi';
import styles from './card.module.scss';

import TagsStatus from './../Statistics/TagsStatus/TagsStatus';
import Rating from './../Statistics/Rating/Rating';
import Follows from './../Statistics/Follows/Follows';
import Seen from './../Statistics/Seen/Seen';
import Comments from './../Statistics/Comments/Comments';
import MangaStatus from './../Manga/MangaStatus';

import { BlocksIcon, EaseRowIcon, RowIcon } from '../../Assets/Svg/CardTypes';

import Img from './../StyledComponents/Img/Img';

import { cutString } from './../../Commons/cutString';
import { strToUpper } from './../../Commons/stringToUpperCase';
import { filterSomeAttribute } from './../../Commons/filterAttribute';

const Card = memo(({ mangasArr }) => {
    const [refControls, setRefControls] = useState(null);
    const [refContent, setRefContent] = useState(null);
    const [currentControl, setCurrentControl] = useState('row');

    const handleControls = (e) => {
        if (refControls) {
            const elems = refControls.querySelectorAll('div');
            elems.forEach(el => el.classList.remove(styles.active))
            elems.forEach(el => {
                if (el.dataset.control === e.target.dataset.control) {
                    el.classList.add(styles.active);
                    setCurrentControl(e.target.dataset.control);
                }
            })
        }
    }

    return (
        <div className={styles.wrapp} style={{paddingBottom: '48px'}}>
            <div className={styles.controls_wrapp}>
                <p>Related Titles</p>
                <div ref={setRefControls} className={styles.controls} onClick={handleControls}>
                    <div data-control="row" className={styles.active}><RowIcon /></div>
                    <div data-control="e-row"><EaseRowIcon /></div>
                    <div data-control="blocks"><BlocksIcon /></div>
                </div>
            </div>
            <div ref={setRefContent} className={styles.content}>
                {
                    mangasArr.map(manga => manga !== undefined ? 
                        <CardItem manga={manga} currentControl={currentControl} refContent={refContent} /> : null
                    )
                }
            </div>
        </div>
    );
});

const CardItem = ({ manga, currentControl, refContent }) => {
    const [mangaInfo, setMangaInfo] = useState({});

    const [refTitle, setRefTitle] = useState(null);
    const [refCover, setRefCover] = useState(null);
    const [refDescription, setRefDescription] = useState(null);

    useEffect(() => {
        if (manga) {
            (async() => {
                const mangaInfo = await MangaDexApi.getMangaInfo(manga?.id);
                setMangaInfo(mangaInfo);
            })()
        }
    }, [manga]);

    useEffect(() => {
        if (refTitle) {
            if (currentControl === 'row') {
                refDescription.classList.remove(styles.disable);
                refContent.classList.remove(styles.content_blocks);
                refTitle.classList.remove(styles.title_e_row);
                refCover.classList.remove(styles.cover_e_row);
            }
            if (currentControl === 'e-row') {
                refDescription.classList.remove(styles.disable);
                refContent.classList.remove(styles.content_blocks);
                refTitle.classList.add(styles.title_e_row);
                refCover.classList.add(styles.cover_e_row);
            }
            if (currentControl === 'blocks') {
                refDescription.classList.add(styles.disable);
                refContent.classList.add(styles.content_blocks);
            }
        }    
    }, [currentControl]);

    return (
        <div className={styles.item}>
            <p className={styles.name}>{strToUpper(manga.related)}</p>
            <div className={styles.item_content}>
                <div ref={setRefCover} className={styles.cover}>
                    <Img 
                        src={`https://uploads.mangadex.org/covers/${mangaInfo?.data?.id}/${filterSomeAttribute(mangaInfo?.data?.relationships, 'cover_art', 'fileName')}`} 
                        alt='' 
                    />
                </div>
                <div ref={setRefDescription} className={styles.description}>
                    <div ref={setRefTitle} className={styles.title}>
                        <div>{mangaInfo?.data?.attributes?.title?.en}</div>
                        <div className={styles.statistics}>
                            <Rating statistic={[]} />
                            <Follows statistic={[]} />
                            <Seen statistic={[]} />
                            <Comments statistic={[]} />
                            <MangaStatus 
                                status={mangaInfo?.data?.attributes?.status} 
                                styles={{textStyles: { fontSize: '.9rem' }, blockStyles: {padding: '5.5px 10px'}}}
                            />
                        </div>
                    </div>
                    <div>
                        <TagsStatus 
                            tags={mangaInfo?.data?.attributes?.tags} 
                            amount={20}
                            customStyles={{backgroundColor: 'white'}}
                        />
                    </div>
                    <div className={styles.main_title}>
                        {
                            cutString(mangaInfo?.data?.attributes?.description?.en, 1000)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;