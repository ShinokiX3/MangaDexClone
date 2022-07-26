import React from 'react';
import MangaStatus from '../../Components/Manga/MangaStatus';
import { Comments, Follows, Rating, Seen } from '../../SharedUI/Statistics';
import TagsStatus from '../../SharedUI/Statistics/TagsStatus/TagsStatus';
import Img from '../../SharedUI/StyledComponents/Img/Img';
import { cutString } from '../../Utils/cutString';
import { filterSomeAttribute } from '../../Utils/filterAttribute';
import { strToUpper } from '../../Utils/stringToUpperCase';
import styles from './card.module.scss';

const Card = ({ manga, mangaInfo, setRefCover, refCoverStyle, refTitleStyle }) => {
    return (
        <div className={styles.item}>
            <p className={styles.name}>{strToUpper(manga.related)}</p>
        <div className={styles.item_content}>
            <div ref={setRefCover} className={styles.cover + ' ' + refCoverStyle}>
                <Img 
                    src={`https://uploads.mangadex.org/covers/${mangaInfo?.data?.id}/${filterSomeAttribute(mangaInfo?.data?.relationships, 'cover_art', 'fileName')}`} 
                    alt='' 
                />
            </div>
            <div className={styles.description}>
                <div className={styles.title + ' ' + refTitleStyle}>
                    <div>{mangaInfo?.data?.attributes?.title?.en}</div>
                    <div className={styles.statistics}>
                        {/* TODO: Create new component to compose these statistic's items */}
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
                            cutString(mangaInfo?.data?.attributes?.description?.en, 500)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;