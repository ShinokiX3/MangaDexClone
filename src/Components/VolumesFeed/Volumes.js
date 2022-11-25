import React, { useEffect, useState } from 'react';
import styles from './chapters.module.scss';
import Volume from './Volume';
import Pagination from '../Pagination/Pagination';
import Spinner from '../../SharedUI/LoadComponents/Spiner/Spinner';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMangaFeed } from '../../Store/Slices/mangaSlice';

const step = 96;

const Volumes = ({ mangaId }) => {
    const [pages, setPages] = useState(1);
    const [currPage, setCurrPage] = useState(1);
    const [offset, setOffset] = useState(0);

    const dispatch = useDispatch();
    const mangaFeed = useSelector(state => state.manga.feed);

    useEffect(() => {
        if (mangaFeed.load.status === 'resolved') {
            setPages(Math.ceil(mangaFeed?.data?.total / step));
        }
    }, [mangaFeed.load.status])

    useEffect(() => {
        dispatch(fetchMangaFeed({mangaId, offset}));
    }, [currPage])
    
    return (
        <>
        {
        mangaFeed.load.status === 'loading' ||  mangaFeed.load.status === '' ? <Spinner customStyle={{width: '50px', height: '50px'}} /> 
        :
        <div className={styles.chapters}>
            <div className={styles.controls_block}>
                <input className="reg-button" type="button" value="Descending" />
                <input className="reg-button" type="button" value="Collapse" />
            </div>
            <div className={styles.content_block}>
                {
                    mangaFeed?.data?.array?.map((volume, index) => {
                        return (
                            <Volume key={Object.keys(volume)[0] + index} volume={volume} />
                        )
                    })
                }
            </div>
            <div className="page-block">
                {
                    mangaFeed.load.status === 'resolved' ?
                    <Pagination pages={pages} currPage={currPage} step={step} setOffset={setOffset} setCurrPage={setCurrPage} />
                    :
                    null
                }
            </div>
        </div>
        }
        </>
    );
};

export default Volumes;