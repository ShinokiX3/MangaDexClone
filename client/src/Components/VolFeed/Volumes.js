import React, { useEffect, useState } from 'react';
import MangaDexApi from '../../Services/MangaDexApi';
import styles from './chapters.module.scss';
import Volume from './Volume';
import { collectData } from '../../Commons/layoutData';
import Pagination from '../Pagination/Pagination';
import Spinner from '../LoadComponents/Spiner/Spinner';

const Volumes = ({mangaId}) => {
    const [pages, setPages] = useState(1);
    const [currPage, setCurrPage] = useState(1);
    const [step, setStep] = useState(96);
    const [offset, setOffset] = useState(0);
    const [mangaFeed, setMangaFeed] = useState([]);

    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        setIsLoading(true);
    }, []);

    useEffect(() => {
        (async() => {
            const mangaFeed = (await MangaDexApi.getMangaFeed(mangaId, offset));
            setMangaFeed(collectData(mangaFeed?.data, 'volume'));
            setPages(Math.ceil(mangaFeed?.total / step));
            setIsLoading(false);
        })();
    }, [mangaId])

    useEffect(() => {
        setIsLoading(true);
        (async() => {
            const mangaFeed = await MangaDexApi.getMangaFeed(mangaId, offset);
            setMangaFeed(collectData(mangaFeed?.data, 'volume'));
            setIsLoading(false);
        })();
    }, [currPage])

    useEffect(() => {
        console.log(mangaFeed);
    });
    
    return (
        <>
        {
        isLoading ? <Spinner /> 
        :
        <div className={styles.chapters}>
            <div className={styles.controls_block}>
                <input className="reg-button" type="button" value="Descending" />
                <input className="reg-button" type="button" value="Collapse" />
            </div>
            <div className={styles.content_block}>
                {
                    mangaFeed?.map((volume, index) => {
                        return (
                            <Volume key={Object.keys(volume)[0] + index} volume={volume} />
                        )
                    })
                }
            </div>
            <div className="page-block">
                <Pagination pages={pages} currPage={currPage} step={step} setOffset={setOffset} setCurrPage={setCurrPage} />
            </div>
        </div>
        }
        </>
    );
};

export default Volumes;