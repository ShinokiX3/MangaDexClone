import React, { memo, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Cover from '../../../SharedUI/StyledComponents/Cover/Cover';

import TagsStatus from '../../../SharedUI/Statistics/TagsStatus/TagsStatus';
import MangaStatus from '../../../Components/Manga/MangaStatus';

import { Rating, Follows, Seen } from '../../../SharedUI/Statistics';
import { filterSomeAttribute } from '../../../Utils/filterAttribute';
import MangaControls from '../MangaControls/MangaControls';
import { useSelector } from 'react-redux';
import Spinner from '../../../SharedUI/LoadComponents/Spiner/Spinner';

// TODO: will have to do it with redux.

const MangaHeader = memo(({ mangaInfo = {} }) => {
    const [mangaCoverUrl, setMangaCoverUrl] = useState('');

    const backImage = useMemo(() => {
        if (mangaInfo.data) {
            const mangaCover = `https://uploads.mangadex.org/covers/${mangaInfo.data.id}/${filterSomeAttribute(mangaInfo.data.relationships, 'cover_art').attributes.fileName}`;
            setMangaCoverUrl(mangaCover);
            return {
                backgroundImage: `url(${mangaCover})`
            }
        }
    }, [mangaInfo])

    return (
        <>
        <Cover 
            src={mangaCoverUrl} 
            alt=''
            classLists={{wrapp: 'manga-cover-cl', img: ''}}
            countryIco={mangaInfo?.data?.attributes?.originalLanguage}
        />
        <MangaTitle mangaInfo={mangaInfo} />
        <MangaIntroduction mangaInfo={mangaInfo} />
        <div className="banner-image" style={backImage}></div>
        </>
    );
});

const MangaTitle = memo(({ mangaInfo }) => {

    // TODO: seems like unusefull 

    const enTitle = useMemo(() => mangaInfo?.data?.attributes?.title?.en, [mangaInfo]);
    const alternative = useMemo(() => {
        const en = mangaInfo?.data?.attributes?.altTitles?.filter(el => el.en)[0]?.en;
        const ja = mangaInfo?.data?.attributes?.altTitles?.filter(el => el.ja)[0]?.ja;
        return en ? en : ja
    }, [mangaInfo]);
    
    // TODO: Change filter method to some else, which can be dynamic ent value
    
    return (
        <div className="manga-title" style={{zIndex: '105'}}>
            <div className="manga-title_wrapp">
                <div>
                    <p className="main-title">{enTitle}</p>
                    <p className="second-title">{alternative}</p>
                    <p className='sub-title main-sub-title'>{filterSomeAttribute(mangaInfo?.data?.relationships, 'author', 'name')}</p>
                </div>
                <MangaStatistics statistics={{}} />
            </div>
            <div>
                <p className='sub-title'>{filterSomeAttribute(mangaInfo?.data?.relationships, 'author', 'name')}</p>
            </div>
        </div>
    );
});

const MangaIntroduction = memo(({ mangaInfo }) => {
    const statistics = useSelector(state => state.manga.statistics);

    return (
        <div className="introduction" style={{zIndex: '105'}}>
            <MangaControls mangaInfo={mangaInfo} isAuthorize={false} />
            <MangaVariablesStatus mangaInfo={mangaInfo} />
            <MangaStatistics statistics={statistics.data} />
        </div>
    )
});

const MangaVariablesStatus = memo(({ mangaInfo = {} }) => {

    // TODO: might be thinking about another destructure or other ways to organize

    const tags = useMemo(() => {
        if (mangaInfo.data) {
            return mangaInfo?.data?.attributes?.tags;
        }
    }, [mangaInfo.data]) 

    const status = useMemo(() => {
        if (mangaInfo.data) {
            return mangaInfo?.data?.attributes?.status;
        }
    }, [mangaInfo.data])

    const publicationYear = useMemo(() => {
        if (mangaInfo.data) {
            return mangaInfo?.data?.attributes?.year;
        }
    }, [mangaInfo.data])

    return (
        <div className="manga-var-status">
            <TagsStatus tags={tags} amount={20} />
            <MangaStatus 
                status={status} 
                additionalInfo={`Publication: ${publicationYear},`}
                styles={{
                    textStyles: {textTransform: 'uppercase', fontWeight: 'bold', fontSize: '12px'},
                    blockStyles: {backgroundColor: 'transparent', marginBottom: '5px'}
                }}
            />
        </div>
    )
});

const MangaStatistics = memo(({ statistics = {} }) => {
    const stats = useMemo(() => {
        if (!!statistics) {
            return Object.values(statistics)[0];
        }
    }, [statistics]);

    return stats ? (
        <div className="manga-statistics">
            <Rating rating={stats.rating} details />
            <Follows follows={stats.follows} />
            <Seen statistic={statistics} />
        </div>
    ) : null;
});


export default MangaHeader;