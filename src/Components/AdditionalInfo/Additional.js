import React, { useEffect, useState } from 'react';
import Keyvalues from './Keyvalues/Keyvalues';
import { configureTags } from './configureTags';
import AlternativeTitles from './AlternativeTitles/AlternativeTitles';
import { useSelector } from 'react-redux';

const Additional = () => {
    const [tagsArr, setTagsArr] = useState([]);
    const [altTitles, setAltTitles] = useState([]);

    const mangaInfo = useSelector(state => state.manga.mangaInfo);

    useEffect(() => {
        if (mangaInfo.load.status === 'resolved') {
            setTagsArr(configureTags(mangaInfo));
            setAltTitles(mangaInfo.data.attributes.altTitles);
        }
    }, [mangaInfo.load.status]);

    return (
        <div style={{display: 'flex', flexWrap: 'wrap', width: '95%'}}>
            {
                tagsArr?.map((tag, index) => <Keyvalues key={tag.name} tagObj={tag} />)
            }
            <AlternativeTitles titles={altTitles} />
        </div>
    );
};

export default Additional;