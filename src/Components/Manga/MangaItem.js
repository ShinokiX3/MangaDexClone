import React, { useEffect, useState } from 'react';
import './mangaItem.scss';

import JikanApi from '../../Services/JikanApi';
import MangaDexApi from '../../Services/MangaDexApi';

import MangaDetails from './MangaDetails';
import { useNavigate } from 'react-router-dom';

const MangaItem = (props) => {

    const navigate = useNavigate();

    const [info, setInfo] = useState([]);
    const [descrStatus, setDescrStatus] = useState('');

    const { mal_id, title, image_url } = props.manga;

    const getInfoAboutManga = async (id, e) => {
        const currClientWdith = document.documentElement.clientWidth;
        const mangaItem = document.querySelector('.manga-item');
        const mangaWidth = mangaItem.clientWidth, mangaHeight = mangaItem.clientHeight;

        if (currClientWdith - e?.screenX < mangaHeight + mangaWidth &&
                e?.screenX < mangaHeight + mangaWidth) {
            setDescrStatus('fade');
        } else if (currClientWdith - e?.screenX < mangaHeight + mangaWidth) {
            setDescrStatus('fade left-oriental');
        } else {
            setDescrStatus('fade right-oriental');
        }
    }

    useEffect(() => {
        (async() => {
            await JikanApi.getInfoAbout(mal_id).then(data => setInfo(data));
        })();
    }, [])

    const searchManga = async (title) => {
        let mangaVars = await MangaDexApi.getSearcedManga(title);
        const mangaNo = mangaVars?.data?.reduce((prev, curr, idx) => {
            return curr?.attributes?.title?.en === title ? idx : prev
        }, 0);
        const mangaId = mangaVars?.data[mangaNo]?.id;
        navigate(`/manga/${mangaId}`);
    }

    const closeDetails = () => {
        setDescrStatus('');
    }
    return (
        <div className="manga-item"
             onClick={() => searchManga(title)} 
             onMouseEnter={(e) => getInfoAboutManga(mal_id, e)}
             onMouseLeave={() => closeDetails()}>
            <img src={image_url} alt="manga-img" />
            <p>{title}</p>
            {
                descrStatus === "fade" ? true :
                <MangaDetails mangaInfo={info} 
                descrStatus={descrStatus} />
            }
        </div>
    );
};

export default MangaItem;