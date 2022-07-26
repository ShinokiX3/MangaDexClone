import { memo, useEffect, useMemo, useState } from 'react';
import MangaDexApi from '../../Services/MangaDexApi';
import styles from './card.module.scss';

// import { BlocksIcon, EaseRowIcon, RowIcon } from '../../Assets/Svg/CardTypes';

import { filterSomeAttribute } from '../../Utils/filterAttribute';
import CardControls from './CardControls';
import Cover from '../../SharedUI/StyledComponents/Cover/Cover';
import Card from './Card';

const Cards = memo(({ mangasArr, children }) => {
    const [refControls, setRefControls] = useState(null);
    const [refContent, setRefContent] = useState(null);
    const [currentControl, setCurrentControl] = useState('row');

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

    return (
        <div className={styles.wrapp} style={{paddingBottom: '48px'}}>
            <div className={styles.controls_wrapp}>
                { children }
                <CardControls setRefControls={setRefControls} handleControls={handleControls} />
            </div>
            <div ref={setRefContent} className={styles.content}>
                {mangasArr.length > 0 ?
                    mangasArr.map(manga => manga !== undefined ? 
                        <CardItem manga={manga} currentControl={currentControl} /> : null
                    )
                    :
                    <div className={styles.couldnt_find} style={{width: '100%', height: '50px', backgroundColor: '#f0f1f2', borderRadius: '0.5rem', fontSize: '14pt', textAlign: 'center'}}>No Data Found</div>
                }
            </div>
        </div>
    );
});

const CardItem = memo(({ manga, currentControl }) => {
    const [mangaInfo, setMangaInfo] = useState({});
    const [blockView, setBlockView] = useState(false);
    const [refCover, setRefCover] = useState(null);

    useEffect(() => {
        if (manga) {
            (async() => {
                const mangaInfo = await MangaDexApi.getMangaInfo(manga?.id).then(data => data.json());
                setMangaInfo(mangaInfo);
            })()
        }
    }, [manga]);

    useEffect(() => {
        console.log(blockView);
    }, [blockView]);

    return (
        <ChooseCardViewType type={currentControl} manga={manga} mangaInfo={mangaInfo} setRefCover={setRefCover} />
    )
});

const ChooseCardViewType = ({ type, manga, mangaInfo, setRefCover, setRefTitle, setRefDescription }) => {
    
    switch(type) {
        case 'row': return (
            <Card 
                manga={manga} 
                mangaInfo={mangaInfo} 
                setRefCover={setRefCover} 
            />
        )
        case 'e-row': return (
            <Card 
                manga={manga} 
                mangaInfo={mangaInfo} 
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