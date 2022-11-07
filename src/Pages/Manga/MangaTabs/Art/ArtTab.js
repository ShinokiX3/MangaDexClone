import React, { useState, useEffect, memo } from 'react';
import { ExploreIco } from '../../../../Assets/Svg/Covers';
import Cover from '../../../../SharedUI/StyledComponents/Cover/Cover';
import Pagination from '../../../../Components/Pagination/Pagination';
import MangaDexApi from '../../../../Services/MangaDexApi';
import styles from './alttab.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMangaCovers } from '../../../../Store/Slices/mangaSlice';

const ArtTab = memo(({ mangaId }) => {

    const [coversFeed, setCoversFeed] = useState([]);
    const [pages, setPages] = useState(1);
    const [offset, setOffset] = useState(0);
    const [step, setStep] = useState(32);
    const [currPage, setCurrPage] = useState(1);

    const dispatch = useDispatch();
    const covers = useSelector(state => state.manga.covers);

    // useEffect(() => {
    //     if (!covers.data) {
    //         dispatch(fetchMangaCovers({mangaId}));
    //     }
    // }, []);

    useEffect(() => {
        if (covers.data.total) {
            setPages(Math.ceil(covers?.data?.total / step));
        }
    }, [covers.data])

    useEffect(() => {
        setOffset((currPage - 1) * step);
        dispatch(fetchMangaCovers({mangaId, offset}));
    }, [currPage]);

    // useEffect(() => {
    //     setOffset((currPage - 1) * step);
    //     (async() => {
    //         const covers = await MangaDexApi.getMangaCoversByVolumes(mangaId, offset);
    //         setCoversFeed(covers?.array);
    //     })();
    // }, [currPage])

    return (
        <>
            <p className={styles.name}>Covers</p>
            <div className={styles.alt_block_settings}>
                {
                    covers?.data?.array?.map(cover => (
                        <Cover
                            src={cover?.filePath}
                            alt={'Volume cover ' + cover?.volume}
                            stylesList={{
                                height: '360px',
                                width: '250px'
                            }}
                            classLists={{
                                wrapp: styles.alt_wrapp_settings,
                                img: styles.img_settings
                            }}
                        >
                            <span><p>Volume {cover?.volume}</p></span>
                        </Cover>
                    ))
                }
            </div>
            {/* <Pagination pages={pages} currPage={currPage} step={step} setOffset={setOffset} setCurrPage={setCurrPage} /> */}
        </>
    );
});

export default ArtTab;