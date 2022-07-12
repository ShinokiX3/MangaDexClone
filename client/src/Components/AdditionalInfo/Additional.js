import React, { useEffect, useState } from 'react';
import Keyvalues from './Keyvalues/Keyvalues';
import { configureTags } from './configureTags';
import AlternativeTitles from './AlternativeTitles/AlternativeTitles';

const Additional = ({ mangaInfo }) => {
    const [tagsArr, setTagsArr] = useState([]);
    const [altTitles, setAltTitles] = useState([]);

    useEffect(() => {
        if (mangaInfo) {
            setTagsArr(configureTags(mangaInfo));
            setAltTitles(mangaInfo?.altTitles);
        }
    }, [mangaInfo]);

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