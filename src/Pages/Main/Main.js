import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './main.scss';

import MangaItems from '../../Components/Manga/MangaItems';
import { fetchManga } from '../../OldStore/Actions/manga';

const Main = () => {
    const dispatch = useDispatch();
    const manga = useSelector(state => state.manga);

    useEffect(() => {
        if (manga?.mangaList <= 0) {
            dispatch(fetchManga(1, 'bypopularity'));
        }
    }, [])

    const foo = async (link) => {
        await fetch(link)
            .then(data => data.json())
            .then(res => console.log(res));
    }

    return (
        <main className="main">
            <MangaItems mangaList={manga.mangaList} />
        </main>
    );
};

export default Main;