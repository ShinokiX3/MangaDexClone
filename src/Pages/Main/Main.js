import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './main.scss';

import Sidebar from '../../Features/Sidebar/Sidebar';
import MangaItems from '../../Components/Manga/MangaItems';
import { fetchManga } from '../../OldStore/Actions/manga';
import { fetchFilterData } from '../../OldStore/Actions/manga';

const Main = () => {

    const dispatch = useDispatch();
    const manga = useSelector(state => state.manga);

    useEffect(() => {
        if (manga?.mangaList <= 0) {
            dispatch(fetchManga(1, 'bypopularity'));
        }
    }, [])

    useEffect(() => {
        if (manga.mangaFilterData?.genre) {
            // dispatch(fetchFilterData(manga?.mangaFilterData));
        }
    }, [manga?.mangaFilterData])

    const foo = async (link) => {
        await fetch(link)
            .then(data => data.json())
            .then(res => console.log(res));
    }

    // https://api.mangadex.org/manga/{id}/feed

    // chapter id 497f6eca-6276-4993-bfeb-53cbbbba6f08

    // https://api.mangadex.org/chapter/{id}

    // https://api.mangadex.org/manga/da229b4e-7722-40e2-8c0b-4def041fe884/feed'

    // foo('https://api.mangadex.org/chapter/497f6eca-6276-4993-bfeb-53cbbbba6f08');
    // foo('https://api.mangadex.org/manga/da229b4e-7722-40e2-8c0b-4def041fe884')
    // foo('https://api.mangadex.org/manga/da229b4e-7722-40e2-8c0b-4def041fe884/aggregate')
    // foo('https://api.mangadex.org/manga/da229b4e-7722-40e2-8c0b-4def041fe884/')
    // foo('https://api.mangadex.org/cover');
    // foo('https://api.mangadex.org/cover/e237402a-a103-40f1-98fb-b37b004f7819/')
    // foo('https://api.mangadex.org/cover/6c8df086-c41a-4408-a8e8-956931ec9c1e.png')
    // foo('https://api.mangadex.org/6c8df086-c41a-4408-a8e8-956931ec9c1e.png')

    // foo('https://api.mangadex.org/chapter/74ccc7da-d24a-4a1e-a56b-17969057b14b/1');

    // foo('https:/uploads.mangadex.org/chapter/7444450067a683fc1da5cc7bdb6e980c')

    // foo('https://api.mangadex.org/at-home/server/74ccc7da-d24a-4a1e-a56b-17969057b14b?forcePort443=false');
    // foo('https://api.mangadex.org/manga');

    // chapters list https://api.mangadex.org/chapter  ???? /manga/ {manga id}

    // foo('https://api.mangadex.org/chapter ');

    return (
        <main className="main">
            {/* <Sidebar /> */}
            <MangaItems mangaList={manga.mangaList} />
        </main>
    );
};

export default Main;