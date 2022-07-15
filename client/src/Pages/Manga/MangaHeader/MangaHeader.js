import React, { memo, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Cover from '../../../SharedUI/StyledComponents/Cover/Cover';

import TagsStatus from '../../../SharedUI/Statistics/TagsStatus/TagsStatus';
import MangaStatus from '../../../Components/Manga/MangaStatus';

import { BookIcon, ReportIcon, ShareIcon } from '../../../Assets/Svg/Manga';

import { Rating, Follows, Seen } from '../../../SharedUI/Statistics';
import { filterSomeAttribute } from '../../../Utils/filterAttribute';

// TODO: will have to do it with redux.

const MangaHeader = memo(({ mangaInfo = {}, authors = [] }) => {
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

    const author = useMemo(() => {
        return filterSomeAttribute(authors, 'author');
    }, [authors])

    return (
        <>
            <Cover 
                src={mangaCoverUrl} 
                alt='manga cover' 
                style={{zIndex: '105', gridArea: 'manga-cover', margin: '10px', alignSelf: 'flex-start', width: '200px'}} 
                countryIco={mangaInfo?.data?.attributes?.originalLanguage}
            />
            <MangaTitle mangaInfo={mangaInfo} authorName={author?.name} />
            <MangaIntroduction mangaInfo={mangaInfo} />
            <div className="banner-image" style={backImage}></div>
        </>
    );
});

const MangaTitle = memo(({ mangaInfo, authorName = '' }) => {
    const enTitle = useMemo(() => mangaInfo?.data?.attributes?.title?.en, [mangaInfo]);
    const alternative = useMemo(() => (mangaInfo?.data?.attributes?.altTitles?.filter(el => el.en)[0])?.en, [mangaInfo]);
    
    // TODO: Change filter method to some else, which can be dynamic ent value
    
    return (
        <div className="manga-title" style={{zIndex: '105'}}>
            <div>
                <p className="main-title">{enTitle}</p>
                <p style={{fontSize: "1.25rem", lineHeight: "1.25rem"}}>{alternative}</p>
            </div>
            <div>
                <p className='sub-title'>{authorName}</p>
            </div>
        </div>
    );
});

const MangaIntroduction = memo(({ mangaInfo }) => {
    const navigate = useNavigate();

    const redirectToReader = () => {
        navigate(`/chapter/${mangaInfo?.data?.id}`);
    }

    return (
        <div className="introduction" style={{zIndex: '105'}}>
            <div className="buttons_wrapp">
                <button className="add-butt">
                    <p>Add To Library</p>
                </button>
                <button className="read-butt" onClick={redirectToReader}>
                    <BookIcon />
                    <p className="butt-with-ico">Start Reading</p>
                </button>
                <button className="report-butt">
                    <ReportIcon />
                </button>
                <button className="share-butt">
                    <ShareIcon />
                </button>
            </div>
            <MangaVariablesStatus mangaInfo={mangaInfo} />
            <MangaStatistics statistics={{}} />
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
        <div style={{display: 'flex', alignItems: 'center', marginTop: '15px'}}>
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
    return (
        <div className="manga-statistics">
            <Rating statistic={statistics} />
            <Follows statistic={statistics} />
            <Seen statistic={statistics} />
        </div>
    )
});


export default MangaHeader;