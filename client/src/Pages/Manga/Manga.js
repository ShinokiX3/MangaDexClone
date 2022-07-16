import React, { memo, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './mangaPage.scss';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMangaCovers, fetchMangaFeed, fetchMangaInfo, fetchMangaStatistics } from '../../Store/Slices/mangaSlice';

import MangaHeader from './MangaHeader/MangaHeader';
import MangaSynopsis from './MangaSynopsis/MangaSynopsis';
import MangaContent from './MangaContent/MangaContent';
import MainContainer from '../../Layouts/MainContainer/MainContainer';

const Manga = memo(() => {
    const navigate = useNavigate();
    
    const params = useParams();
    const mangaId = useMemo(() => params.id, [params])

    const dispatch = useDispatch();
    const manga = useSelector(state => state.manga);

    const mangaInfo = useSelector(state => state.manga.mangaInfo);

    useEffect(() => {
        dispatch(fetchMangaInfo({mangaId}));
        dispatch(fetchMangaStatistics({mangaId}));
        dispatch(fetchMangaCovers({mangaId}));
        dispatch(fetchMangaFeed({mangaId}));
    }, [mangaId])

    // TODO: create layout for main attribute, like current container.

    return (
        <MainContainer mainClasses='manga-page' containerClasses='manga-container'>
            <MangaHeader mangaInfo={mangaInfo} />
            <MangaSynopsis description={mangaInfo?.data?.attributes?.description?.en} />
            <MangaContent mangaId={mangaId} mangaInfo={mangaInfo} />
        </MainContainer>
    );

});

export default Manga;