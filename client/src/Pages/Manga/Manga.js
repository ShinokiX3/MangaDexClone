import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MangaDexApi from '../../Services/MangaDexApi';
import './mangaPage.scss';
import { useObserver } from '../../Hooks/useObserver';

import { Rating, Follows, Seen } from '../../Components/Statistics';

import { BookIcon, ShareIcon, ReportIcon } from '../../Assets/Svg/Manga';
import Cover from '../../Components/StyledComponents/Cover/Cover';
import { ExploreIco } from '../../Assets/Svg/Covers';

import MangaStatus from '../../Components/Manga/MangaStatus';
import TagsStatus from '../../Components/Statistics/TagsStatus/TagsStatus';

import ChaptersTab from '../../Tabs/Manga/Chapters/ChaptersTab';
import ArtTab from '../../Tabs/Manga/Art/ArtTab';
import RelatedTab from '../../Tabs/Manga/Related/RelatedTab';

import LoadingWrapp from '../../Components/LoadComponents/LoadingWrapp/LoadingWrapp';

import { filterSomeAttribute } from '../../Commons/filterAttribute';
import { filterSomeAttributes } from '../../Commons/filterSomeAttributes';

const Manga = () => {
    const navigate = useNavigate();
    
    const params = useParams();
    const mangaId = params['*'];

    const [mangaCoverUrl, setMangaCoverUrl] = useState('');
    const [mangaInfo, setMangaInfo] = useState({});
    const [backImage, setBackimage] = useState({});
    const [mangaVolumes, setMangaVolumes] = useState({});
    const [alternative, setAlternative] = useState('');
    const [statistics, setStatistics] = useState({});

    const [stickyStatus, setRef] = useObserver({threshold: 0.9});

    const [currentTab, setCurrentTab] = useState('Chapters');

    useEffect(() => {
        (async() => {
            const mangaInfo = await MangaDexApi.getMangaInfo(mangaId);
            const mangaCover = await MangaDexApi.getMangaCover(mangaId);
            const volumes = await MangaDexApi.getMangaChapters(mangaId);
            const statistics = await MangaDexApi.getMangaStatistics(mangaId);
            const covers = await MangaDexApi.getMangaCoversByVolumes(mangaId);
            
            const author = await MangaDexApi.getAuthorInfo(filterSomeAttribute(mangaInfo?.data?.relationships, 'author')?.id);
            const artist = await MangaDexApi.getAuthorInfo(filterSomeAttribute(mangaInfo?.data?.relationships, 'artist')?.id);

            const backImageSettings = {
                backgroundImage: `url(${mangaCover})`,
            }
            const alternativeSettings = ((mangaInfo?.data?.attributes?.links?.ap)
            ?.split('-').map(item => {
                let temp = item.split(''); 
                temp[0] = temp[0].toUpperCase(); 
                return temp.join('');
            }))?.join(' ')

            mangaInfo.data.attributes.author = author?.data;
            mangaInfo.data.attributes.artist = artist?.data;
            mangaInfo.data.attributes.covers = covers;

            setMangaVolumes(volumes?.volumes);
            setMangaInfo(mangaInfo);
            setAlternative(alternativeSettings);
            setMangaCoverUrl(mangaCover);
            setBackimage(backImageSettings);
            setStatistics(statistics?.statistics);
        })();
    }, [mangaId])

    useEffect(() => {
        if (stickyStatus) {
            toggleStyles('add');
        } else {
            toggleStyles('remove');
        }
        return () => {
            toggleStyles('remove');
        }
    }, [stickyStatus]);

    const toggleStyles = (type) => {
        const header = document.querySelector('.header-block');
        const searchBlock = document.querySelector('.search-block');
        const logo = document.querySelector('#logo');
        const rightLinks = document.querySelector('.right-links_wrapp');

        const addStyles = () => {
            header?.classList.remove('header-white');
            header?.classList.add('header-transparent');

            // searchBlock.classList.add('search-block-dark');
            // searchBlock.classList.add('srch-block-rgba');

            logo.classList.add('logo-dark');
            rightLinks.classList.add('right-links_wrapp-dark');
        }

        const removeStyles = () => {
            header?.classList.remove('header-transparent');
            header?.classList.add('header-white');

            // searchBlock.classList.remove('search-block-dark');
            // searchBlock.classList.add('srch-block-initial');

            logo.classList.remove('logo-dark');
            rightLinks.classList.remove('right-links_wrapp-dark');
        }
        
        if (type === "add") addStyles(); else removeStyles();
    }

    const redirectToReader = () => {
        navigate(`/chapter/${mangaId}`);
    }

    const handleTabs = (e) => {
        if (e.target.nodeName === 'SPAN') {
            setCurrentTab(e.target.innerText);
            const elems = document.querySelectorAll('.select-tab');
            elems.forEach(el => el.classList.remove('active'));
            e.target.classList.add('active');
        }
    }

    return (
        <main className="manga-page">
            <div className="manga-container">
                <Cover 
                    src={mangaCoverUrl} 
                    alt='manga cover' 
                    style={{zIndex: '105', gridArea: 'manga-cover', margin: '10px', alignSelf: 'flex-start', width: '200px'}} 
                    countryIco={mangaInfo?.data?.attributes?.originalLanguage}
                />
                <div className="manga-title" style={{zIndex: '105'}}>
                    <div>
                        <p className="main-title">{mangaInfo?.data?.attributes?.title?.en}</p>
                        <p style={{fontSize: "1.25rem", lineHeight: "1.25rem"}}>{alternative}</p>
                    </div>
                    <div>
                        <p className='sub-title'>{mangaInfo?.data?.attributes?.author?.attributes?.name}</p>
                    </div>
                </div>
                <div ref={setRef} className="banner-image" style={backImage}></div>
                <div className="introduction" style={{zIndex: '105'}}>
                    <div className="buttons_wrapp">
                        <button className="add-butt">
                            <p>Add To Library</p>
                        </button>
                        <button className="read-butt" onClick={() => redirectToReader()}>
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
                    {/* className="manga-tags" style={{display: 'flex', alignItems: 'center'}} */}
                    <div style={{display: 'flex', alignItems: 'center', marginTop: '15px'}}>
                        <TagsStatus tags={mangaInfo?.data?.attributes?.tags} amount={20} />
                        <MangaStatus 
                            status={mangaInfo?.data?.attributes?.status} 
                            additionalInfo={`Publication: ${mangaInfo?.data?.attributes?.year},`}
                            styles={{
                                textStyles: {textTransform: 'uppercase', fontWeight: 'bold', fontSize: '12px'},
                                blockStyles: {backgroundColor: 'transparent', marginBottom: '5px'}
                            }}
                        />
                    </div>
                    <div className="manga-statistics">
                        <Rating statistic={statistics} />
                        <Follows statistic={statistics} />
                        <Seen statistic={statistics} />
                    </div>
                </div>
                <div className="synopsis">
                    <p>{mangaInfo?.data?.attributes?.description?.en}</p>
                </div>
                <div className="content">
                    <div className="selectors" onClick={(e) => handleTabs(e)}>
                        <span className="select-tab active">Chapters</span>
                        <span className="select-tab">Art</span>
                        <span className="select-tab">Related</span>
                    </div>
                    <div className="variable-content">
                        <ChangeTab currentTab={currentTab} mangaId={mangaId} mangaInfo={mangaInfo} />
                    </div>
                </div>
            </div>
        </main>
    );
};

const ChangeTab = ({ currentTab, mangaId, mangaInfo }) => {
    if (currentTab === 'Chapters') {
        return <ChaptersTab mangaId={mangaId} mangaInfo={mangaInfo} />
    } else if (currentTab === 'Art') {
        return <ArtTab covers={mangaInfo?.data?.attributes?.covers} mangaId={mangaId} />
    } else {
        const selectors = ['colored', 'preserialization', 'doujinshi'];
        return <RelatedTab mangaRelations={filterSomeAttributes(mangaInfo?.data?.relationships, selectors)} />
    }
}

export default Manga;