import React, { memo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MangaStatus from '../../Components/Manga/MangaStatus';
import MangaDexApi from '../../Services/MangaDexApi';
import { Comments, Follows, Rating, Seen } from '../../SharedUI/Statistics';
import TagsStatus from '../../SharedUI/Statistics/TagsStatus/TagsStatus';
import Img from '../../SharedUI/StyledComponents/Img/Img';
import { cutString } from '../../Utils/cutString';
import { filterSomeAttribute } from '../../Utils/filterAttribute';
import { strToUpper } from '../../Utils/stringToUpperCase';
import styles from './card.module.scss';

const Card = memo(({ manga, mangaInfo, setRefCover, refCoverStyle, refTitleStyle }) => {
    const navigate = useNavigate();
    const [statistics, setStatistics] = useState('');

    useEffect(() => {
        if (!!mangaInfo) {
            (async () => {
                const statistics = await MangaDexApi.getMangaStatistics(manga?.id).then(data => data.json());
                if (!!statistics) {
                    setStatistics(Object.values(statistics.statistics)[0]);
                }
            })();
        }
    }, []);

    const handleManga = () => {
        navigate(`/manga/${manga.id}`)
    }

    return (
        <div className={styles.item}>
            <p className={styles.name}>{strToUpper(manga.related)}</p>
            <div className={styles.item_content}>
                <div onClick={handleManga} ref={setRefCover} className={styles.cover + ' ' + refCoverStyle}>
                    <Img 
                        src={`https://uploads.mangadex.org/covers/${mangaInfo?.data?.id}/${filterSomeAttribute(mangaInfo?.data?.relationships, 'cover_art', 'fileName')}`} 
                        alt='' 
                    />
                </div>
                <div className={styles.description}>
                    <div className={styles.title + ' ' + refTitleStyle}>
                        <div onClick={handleManga} className={styles.manganame}>{mangaInfo.data ? Object.values(mangaInfo.data.attributes.title)[0] : ''}</div>
                        <div className={styles.statistics}>
                            {/* TODO: Create new component to compose these statistic's items */}
                            {statistics 
                                ? <>
                                  <Rating rating={statistics.rating} />
                                  <Follows follows={statistics.follows} />
                                  </>
                                : null
                            }
                            <Seen statistic={[]} />
                            <Comments statistic={[]} />
                            <MangaStatus 
                                status={mangaInfo?.data?.attributes?.status} 
                                styles={{textStyles: { fontSize: '.9rem' }}}
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
                            cutString(mangaInfo?.data?.attributes?.description?.en, 450)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Card;