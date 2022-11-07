import React, { useEffect, useMemo, useState } from 'react';
import AlternativeTitles from '../../../Components/AdditionalInfo/AlternativeTitles/AlternativeTitles';
import Chapter from '../../../Components/VolumesFeed/Chapter';
import { filterSomeAttribute } from '../../../Utils/filterAttribute';
import { collectData } from '../../../Utils/layoutData';
import styles from '../userpage.module.scss';

const Uploads = ({ userId }) => {
    const [chapters, setChapters] = useState([]);
    const [mangaTitle, setMangaTitle] = useState([]);
    useMemo(() => [mangaTitle], [mangaTitle])

    useEffect(() => {
        (async()=> {
            const chapters = await fetch(`https://api.mangadex.org/chapter?limit=32&offset=0&includes[]=user&includes[]=scanlation_group&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[readableAt]=desc&uploader=${userId}`)
                .then(data => data.json());
            setChapters(collectData(chapters?.data, 'chapter'));
            const mangaId = filterSomeAttribute(chapters?.data[0]?.relationships, 'manga')?.id;
            const manga = await fetch(`https://api.mangadex.org/manga/${mangaId}`)
                .then(data => data.json());
            setMangaTitle([{[manga?.data?.attributes?.originalLanguage]: manga?.data?.attributes?.title?.en}]);
        })()
    }, []);

    return (
        <div className={styles.uploads}>
            <div className={styles.manga_title}>
                <AlternativeTitles titles={mangaTitle} byUser />
            </div>
            {
                chapters.map((chapter, index) => <Chapter key={Object.keys(chapter)[0] + index} chapter={chapter} byUser />)
            }
        </div>
    );
};

export default Uploads;