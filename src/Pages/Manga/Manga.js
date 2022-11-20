import React, { memo, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import './mangaPage.scss';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMangaCovers, fetchMangaFeed, fetchMangaInfo, fetchMangaStatistics } from '../../Store/Slices/mangaSlice';

import MangaHeader from './MangaHeader/MangaHeader';
import MangaSynopsis from './MangaSynopsis/MangaSynopsis';
import MangaContent from './MangaContent/MangaContent';
import MainContainer from '../../Layouts/MainContainer/MainContainer';

const Manga = memo(() => {
    const params = useParams();
    const mangaId = useMemo(() => params.id, [params])

    const dispatch = useDispatch();
    const mangaInfo = useSelector(state => state.manga.mangaInfo);

    useEffect(() => {
        dispatch(fetchMangaInfo({mangaId}));
        dispatch(fetchMangaStatistics({mangaId}));
        dispatch(fetchMangaCovers({mangaId}));
        dispatch(fetchMangaFeed({mangaId}));

        (async () => {
            const res = await fetch('https:/uploads.mangadex.org/covers/d2df017b-c003-4de6-9625-4f1fba7aef97/4de979c2-c6e0-438f-b7e7-3a226324a416.png.256.jpg')
                .then(data => data.json())
                .then(data => console.log(data))
            console.log(res);
        })()
    }, [mangaId])

    return (
        <MainContainer mainClasses='manga-page' containerClasses='manga-container'>
            <MangaHeader mangaInfo={mangaInfo} />
            <MangaSynopsis description={mangaInfo?.data?.attributes?.description?.en} />
            <MangaContent mangaId={mangaId} mangaInfo={mangaInfo} />
        </MainContainer>
    );
});

export default Manga;