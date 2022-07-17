import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MangaItems from '../../Components/Manga/MangaVariables/MangaItems';
import LatestUpdates from '../../Components/Suggestions/LatestUpdates/LatestUpdates';
import './suggestion.scss';

import Slider from '../../Features/Slider/Slider';
import SliderItem from '../../Features/Slider/SliderItem';

import MangaDexApi from '../../Services/MangaDexApi';

import MangaVar1 from '../../Components/Manga/MangaVariables/MangaVar1';
import MangaVar2 from '../../Components/Manga/MangaVariables/MangaVar2';

import MainContainer from '../../Layouts/MainContainer/MainContainer';
import SuggestItem from './SuggestItem';

const Suggestion = memo(() => {
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
        <MainContainer mainClasses='suggestion-page' containerClasses='suggest-content' isHeaderBlack >
            <SuggestItem title='Seasonal' handleNavigate={handleNavigate} >
                <Slider>
                    <MangaItems mangas={seasonal} 
                        Variant={MangaVar1} 
                        Wrapp={SliderItem}
                        styles={{display: "flex", height: "228px"}}
                    />
                </Slider>
            </SuggestItem>

            <SuggestItem title='Latest Updates' handleNavigate={handleNavigate} >
                <LatestUpdates chapters={latestUpdates} />
            </SuggestItem>

            <SuggestItem title='Recently added' handleNavigate={handleNavigate} >
                <Slider>
                    <MangaItems mangas={recentlyAdded} 
                        Variant={MangaVar2} 
                        Wrapp={SliderItem} 
                        styles={{display: "flex", width: "128px", height: "180px"}} 
                    />
                </Slider>
            </SuggestItem>
        </MainContainer>    
    );
});

export default Suggestion;