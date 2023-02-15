import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MangaStatus from '../../Components/Manga/MangaStatus';
import { Comments, Follows, Rating, Seen } from '../../SharedUI/Statistics';
import TagsStatus from '../../SharedUI/Statistics/TagsStatus/TagsStatus';
import Img from '../../SharedUI/StyledComponents/Img/Img';
import { cutString } from '../../Utils/cutString';
import { filterSomeAttribute } from '../../Utils/filterAttribute';
import { strToUpper } from '../../Utils/stringToUpperCase';
import styles from './card.module.scss';

const Card = memo(({ handleMangas, manga, mangaInfo, statistics, setRefCover, refCoverStyle, refTitleStyle }) => {
    const [status, setStatus] = useState(false);

    const navigate = useNavigate();
    
    const handleManga = () => {
        navigate(`/manga/${manga.id}`)
    }
    
    const handleChoice = () => {
        setStatus(!status);
        handleMangas(manga);
    }

    return (
        <div className={styles.item}>
            <p className={styles.name}>{strToUpper(manga.related)}</p>
            <div className={styles.item_content}>
                <div onClick={handleManga} ref={setRefCover} className={styles.cover + ' ' + refCoverStyle}>
                    <Img 
                        src={`https://uploads.mangadex.org/covers/${mangaInfo?.id}/${filterSomeAttribute(mangaInfo?.relationships, 'cover_art', 'fileName')}`} 
                        alt='' 
                    />
                </div>
                <div className={styles.description}>
                    <div className={styles.title + ' ' + refTitleStyle}>
                        <div onClick={handleManga} className={styles.manganame}>{mangaInfo ? cutString(Object.values(mangaInfo.attributes.title)[0], 32) : ''}</div>
                        <div className={styles.statistics}>
                            {statistics 
                                ? <>
                                  <Rating rating={statistics.rating} />
                                  <Follows follows={statistics.follows} />
                                  <Seen statistic={[]} />
                                  <Comments statistic={[]} />
                                  </>
                                : null
                            }
                            <MangaStatus 
                                status={mangaInfo?.attributes?.status} 
                                styles={{textStyles: { fontSize: '.9rem' }}}
                            />
                        </div>
                    </div>
                        <div>
                            <TagsStatus 
                                tags={mangaInfo?.attributes?.tags} 
                                amount={20}
                                customStyles={{backgroundColor: 'white'}}
                            />
                    </div>
                    <div className={styles.main_title}>
                        {
                            cutString(mangaInfo?.attributes?.description?.en, 450)
                        }
                    </div>
                </div>
            </div>
            {handleMangas
                ? <div onClick={handleChoice} className={status ? styles.minus : styles.plus}>
                      {status ? '-' : '+' }
                  </div>
                : null
            }
        </div>
    );
});

export default Card;