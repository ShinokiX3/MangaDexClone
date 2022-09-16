import React from 'react';
import { useEffect, useState, useRef } from 'react';
import styles from './chapters.module.scss';
import { compareDates } from '../../Utils/compareDates';

import { flags } from '../../Assets/Svg/Flags';
import { groupIcons } from '../../Assets/Svg/Groups';
import { dateIcons } from '../../Assets/Svg/Dates';
import { filterSomeAttribute } from '../../Utils/filterAttribute';
import Scanlation from '../../SharedUI/Community/Scanlation/Scanlation';
import { useNavigate } from 'react-router-dom';

const Chapter = ({ chapter, byUser = false }) => {
    const [chName, setChName] = useState('');
    const contentBlock = useRef(null);

    useEffect(() => {
        if (chapter) setChName(Object.keys(chapter)[0]);
    }, [chapter])

    const handleChapter = () => {
        contentBlock.current.style.display = contentBlock.current.style.display === 'none' ? 'block' : 'none';
    }

    return (
        <div className={styles.chapters_block}>
            {!byUser ? null :
                <div className={styles.title}
                    onClick={() => handleChapter()}>
                    {Object.keys(chapter)[0]}
                    <div>{`>`}</div>
                </div>
            }
            <div className={styles.content_wrapp} ref={contentBlock} style={byUser ? {marginBottom: '0px'} : {}}>
                {
                    chapter[chName]?.map((item, index) => (
                        <ChapterEl key={item?.attributes?.title + index} 
                            item={item} index={index} chapter={chapter[chName]} chName={chName} 
                        />
                    ))
                }
            </div>
        </div>
    );
};

const ChapterEl = ({ item, index, chapter, chName }) => {

    const navigate = useNavigate();
    
    const handleUser = (item) => {
        navigate(`/user/${filterSomeAttribute(item?.relationships, 'user')?.id}`);
    }

    return (
        <div className={styles.content}>
            <div className={index === chapter.length - 1 ? 
                styles.side_item + ' ' + styles.last_side_item : styles.side_item}>
            </div>
            <div className={styles.chapter_name}>
                <img src={flags[item?.attributes?.translatedLanguage]} alt=""></img>
                <p>
                    {
                        !(item?.attributes?.title) ? chName
                        : (item?.attributes?.title).length > 20 ? 
                        (item?.attributes?.title).substring(0, 20) + '...' 
                        : item?.attributes?.title
                    }
                </p>
            </div>
                <Scanlation name={filterSomeAttribute(item?.relationships, 'scanlation_group', 'name')} />
            <div className={styles.user}>
                <img src={groupIcons.groups} alt=""></img>
                <p style={{marginLeft: '4px', cursor: 'pointer'}} onClick={() => handleUser(item)}>
                    {
                        filterSomeAttribute(item?.relationships, 'user', 'username')
                    }
                </p>
            </div>
            <div className={styles.timestamp}>
                <img src={dateIcons.clock} alt=""></img>
                <p style={{marginLeft: '4px'}}>
                    {
                        compareDates(item?.attributes?.createdAt)
                    }
                </p>
            </div>
        </div>
    )
}

export default Chapter;