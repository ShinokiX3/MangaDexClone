import React, { memo, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './mangaPage.scss';
import { useObserver } from '../../Hooks/observer';

import { filterSomeAttribute } from '../../Utils/filterAttribute';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMangaAuthor, fetchMangaCovers, fetchMangaFeed, fetchMangaInfo, fetchMangaStatistics } from '../../Store/Slices/mangaSlice';
import MangaHeader from './MangaHeader/MangaHeader';
import MangaSynopsis from './MangaSynopsis/MangaSynopsis';
import MangaContent from './MangaContent/MangaContent';
import MangaDexApi from '../../Services/MangaDexApi';

const Manga = memo(() => {
    const navigate = useNavigate();
    
    const params = useParams();
    const mangaId = useMemo(() => params.id, [params])

    const [stickyStatus, setRef] = useObserver({threshold: 0.9});

    const [authors, setauthors] = useState();

    const dispatch = useDispatch();
    const manga = useSelector(state => state.manga);

    const mangaInfo = useSelector(state => state.manga.mangaInfo);

    useEffect(() => {
        dispatch(fetchMangaInfo({mangaId}));
        dispatch(fetchMangaStatistics({mangaId}));
        dispatch(fetchMangaCovers({mangaId}));
        dispatch(fetchMangaFeed({mangaId}));
    }, [mangaId])

    // TODO: rewrite this part for redux async actions, temp realization.

    useEffect(() => {
        if (mangaInfo.data) {
            (async () => {
                const authors = [
                    filterSomeAttribute(mangaInfo.data.relationships, 'author').id, 
                    filterSomeAttribute(mangaInfo.data.relationships, 'artist').id
                ]
                const response = await Promise.all(
                    await authors.map( async(author) => {
                        return await MangaDexApi.getAuthorInfo(author)
                            .then(data => data.json())
                    })
                )
                setauthors(response.map((res, idx) => {
                    return {
                        type: idx === 0 ? 'author' : 'artist',
                        name: res.data.attributes.name, 
                        attributes: res.data.attributes
                    }
                }));
            })()
        }
    }, [mangaInfo.data]);

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

    // TODO: rewrite header observer logic, optimize classe's toggling.

    const toggleStyles = (type) => {
        const header = document.querySelector('.header-block');
        const logo = document.querySelector('#logo');
        const rightLinks = document.querySelector('.right-links_wrapp');

        const addStyles = () => {
            header?.classList.remove('header-white');
            header?.classList.add('header-transparent');
            logo.classList.add('logo-dark');
            rightLinks.classList.add('right-links_wrapp-dark');
        }

        const removeStyles = () => {
            header?.classList.remove('header-transparent');
            header?.classList.add('header-white');
            logo.classList.remove('logo-dark');
            rightLinks.classList.remove('right-links_wrapp-dark');
        }
        
        if (type === "add") addStyles(); else removeStyles();
    }

    // TODO: add setRef from useObserver or change way to observering header.

    // TODO: create layout for main attribute, like current container.

    return (
        <main className="manga-page">
            <div className="manga-container">
                <MangaHeader mangaInfo={mangaInfo} authors={authors} />
                <MangaSynopsis description={mangaInfo?.data?.attributes?.description?.en} />
                <MangaContent mangaId={mangaId} mangaInfo={mangaInfo} />
            </div>
        </main>
    );
});

export default Manga;