import { memo, useEffect, useState } from 'react';
import MangaDexApi from '../../Services/MangaDexApi';
import styles from './card.module.scss';

import { filterSomeAttribute } from '../../Utils/filterAttribute';
import CardControls from './CardControls';
import Cover from '../../SharedUI/StyledComponents/Cover/Cover';
import Card from './Card';
import Spinner from '../../SharedUI/LoadComponents/Spiner/Spinner';

const Cards = memo(({ mangasArr, handleManga, children }) => {
    const [refControls, setRefControls] = useState(null);
    const [refContent, setRefContent] = useState(null);
    const [currentControl, setCurrentControl] = useState('row');

    const [mangaArrayInfo, setMangaArrayInfo] = useState([]);
    const [mangaStatisticsInfo, setMangaStatisticsInfo] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (mangasArr) {
            (async() => {
                setLoading(true);
                const mangaArrInfo = await MangaDexApi.getMangaInfoByArray(mangasArr).then(data => data.json());

                if (mangaArrInfo.result === 'ok' && mangaArrInfo?.data?.length > 0) {
                    const stats = await fetchStatistics(mangaArrInfo.data);

                    setMangaArrayInfo(mangaArrInfo.data);
                    setMangaStatisticsInfo(stats);
                    
                    setLoading(false);
                } else {
                    setMangaArrayInfo([]);
                    
                    setLoading(false);
                }
            })()
        } else {
            setMangaArrayInfo([]);
            setLoading(false);
        }
    }, [mangasArr]);

    useEffect(() => {
        if (refContent) {
            if (currentControl === 'row') {                
                refContent.classList.remove(styles.content_blocks);
                refContent.classList.remove(styles.flex_covers_wrapp);
                refContent.classList.remove(styles.grid_blocks_wrapp);
            }
            if (currentControl === 'e-row') {
                refContent.classList.remove(styles.content_blocks);
                refContent.classList.remove(styles.flex_covers_wrapp);
                refContent.classList.add(styles.grid_blocks_wrapp);
            }
            if (currentControl === 'blocks') {
                refContent.classList.remove(styles.grid_blocks_wrapp);
                refContent.classList.add(styles.flex_covers_wrapp);
            }
        }    
    }, [currentControl]);

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

    const fetchStatistics = async (mangaArrayInfo) => {
        const mangaStatistics = await MangaDexApi.getMangaStatisticsByArray(mangaArrayInfo)
            .then(data => data.json());
        if (mangaStatistics.result === 'ok') {
            return await mangaStatistics.statistics
        } else {
            return []
        }
    }

    return (
        <div className={styles.wrapp} style={{paddingBottom: '48px'}}>
            <div className={styles.controls_wrapp}>
                { children }
                <CardControls setRefControls={setRefControls} handleControls={handleControls} />
            </div>
            <div ref={setRefContent} className={styles.content}>
                {loading 
                    ? <Spinner customStyle={{width: 40, height: 40, borderColor: 'red'}} /> 
                    : mangaArrayInfo.length > 0 && mangasArr.length > 0
                        ? mangaArrayInfo.map((manga, index) => manga !== undefined ? 
                            <CardItem handleManga={handleManga} key={index} mangaInfo={manga} mangaStatistics={mangaStatisticsInfo[manga?.id]} currentControl={currentControl} /> : null
                          ) 
                        : <div className={styles.couldnt_find} style={{width: '100%', height: '50px', backgroundColor: '#f0f1f2', borderRadius: '0.5rem', fontSize: '14pt', textAlign: 'center'}}>No Data Found</div>
                }
            </div>
        </div>
    );
});

const CardItem = memo(({ mangaInfo, mangaStatistics, currentControl, handleManga }) => {
    const [refCover, setRefCover] = useState(null);

    return (
        <ChooseCardViewType handleManga={handleManga} type={currentControl} manga={mangaInfo} mangaInfo={mangaInfo} mangaStatistics={mangaStatistics} setRefCover={setRefCover} />
    )
});

const ChooseCardViewType = ({ handleManga, type, manga, mangaInfo, mangaStatistics, setRefCover, setRefTitle, setRefDescription }) => {
    switch(type) {
        case 'row': return (
            <Card 
                handleMangas={handleManga}
                manga={manga} 
                mangaInfo={mangaInfo}
                statistics={mangaStatistics} 
                mangaStatistics={mangaStatistics}
                setRefCover={setRefCover} 
            />
        )
        case 'e-row': return (
            <Card 
                handleMangas={handleManga}
                manga={manga} 
                mangaInfo={mangaInfo} 
                statistics={mangaStatistics}
                setRefCover={setRefCover} 
                setRefTitle={setRefTitle} 
                setRefDescription={setRefDescription} 
                refCoverStyle={styles.cover_e_row}
                refTitleStyle={styles.title_e_row}
            />
        )
        case 'blocks': return (
            <Cover
                src={`https://uploads.mangadex.org/covers/${mangaInfo?.data?.id}/${filterSomeAttribute(mangaInfo?.data?.relationships, 'cover_art', 'fileName')}`}
                alt={''}
                stylesList={{height: '360px', width: '250px'}}
                classLists={{wrapp: styles.alt_wrapp_settings, img: styles.img_settings}}
            >
                <span><p>{mangaInfo?.data?.attributes?.title?.en}</p></span>
            </Cover>
        )
        default: return <></>
    }
}

export default Cards;