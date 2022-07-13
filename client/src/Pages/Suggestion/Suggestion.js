import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MangaItems from '../../Components/Manga/MangaVariables/MangaItems';
import LatestUpdates from '../../Components/Suggestions/LatestUpdates/LatestUpdates';
import './suggestion.scss';

import Slider from '../../Features/Slider/Slider';
import SliderItem from '../../Features/Slider/SliderItem';

import MangaDexApi from '../../Services/MangaDexApi';
import MangaVar1 from '../../Components/Manga/MangaVariables/MangaVar1';
import MangaVar2 from '../../Components/Manga/MangaVariables/MangaVar2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Suggestion = () => {
    const navigate = useNavigate();

    const [seasonal, setSeasonal] = useState([]);
    const [latestUpdates, setLatestUpdates] = useState([]);
    const [recentlyAdded, setRecentlyAdded] = useState([]);

    useEffect(() => {
        ( async() => {
            const seasonal = await MangaDexApi.getSeasonal();
            const seasonalIds = getMangasIds(seasonal?.data?.relationships);
            const seasonalInfo = await MangaDexApi.getSeasonalInfo(seasonalIds);
            setSeasonal(seasonalInfo?.data);

            const latestUpdates = await MangaDexApi.getLatestUpdateChapters();
            const latestUpdatesIds = getMangasIds(latestUpdates?.data.reduce((accu, curr) => {
                accu.push(...curr?.relationships.filter(el => el.type === 'manga'))
                return accu;
            } ,[]));
            const latestUpdatesManga = await MangaDexApi.getLatestUpdateMangas(latestUpdatesIds);
    
            latestUpdates.data.map((chapter, idx) => {
                const chapterMangaArr = chapter.relationships.filter(el => el.type === 'manga');
                const chapterMangaId = chapterMangaArr.length >= 1 ? chapterMangaArr[0].attributes.id : '';
                if (chapterMangaId === latestUpdatesManga.data[idx]?.attributes?.id) {
                    const coverArt = latestUpdatesManga.data[idx]?.relationships.filter(el => el.type === 'cover_art');
                    chapter.relationships.push(coverArt?.length >= 1 ? coverArt[0] : false);
                }
                return chapter;
            })
            setLatestUpdates({data: latestUpdates.data.slice(0, 18)});

            const recentlyAdded = await MangaDexApi.getRecentlyAdded();
            setRecentlyAdded(recentlyAdded?.data);
        })();
    }, [])

    const handleNavigate = (url) => {
        navigate(`/titles/${url}`);
    }

    const getMangasIds = (arr) => {
        return arr.map(({ id }) => `&ids[]=${id}`);
    }

    return (
        <main className="suggestion-page">
            <div className="suggest-content">
                <div className="suggest-item">
                    <div className="suggest-name">
                        <div href="" onClick={() => handleNavigate('seasonal')}>
                            <h1>Seasonal</h1>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </div>
                    <div className="suggest-item-content">
                        {
                            <Slider>
                                <MangaItems mangas={seasonal} 
                                    Variant={MangaVar1} 
                                    Wrapp={SliderItem}
                                    styles={{display: "flex", height: "228px"}}
                                />
                            </Slider>
                        }
                    </div>
                </div>
                <div className="suggest-item">
                    <div className="suggest-name">
                        <div href="">
                            <h1>Latest Updates</h1>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </div>
                    <div className="suggest-item-content">
                       <LatestUpdates chapters={latestUpdates} />
                    </div>
                </div>
                <div className="suggest-item">
                    <div className="suggest-name">
                        <div href="">
                            <h1>Recently added</h1>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </div>
                    <div className="suggest-item-content">
                        {
                            <Slider>
                                <MangaItems mangas={recentlyAdded} 
                                    Variant={MangaVar2} 
                                    Wrapp={SliderItem} 
                                    styles={{display: "flex", width: "128px", height: "180px"}} 
                                />
                            </Slider>
                        }
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Suggestion;