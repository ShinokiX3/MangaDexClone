import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { collectData } from '../../Utils/layoutData';
import Chapter from './Chapter';

const Chapters = ({ volume }) => {
    const [chapters, setChapters] = useState([]);
    useEffect(() => {
        if (volume) {
            setChapters(collectData(volume, 'chapter'));
        }
    }, [volume])
    
    return (
        chapters.map((chapter, index) => <Chapter key={Object.keys(chapter)[0] + index} chapter={chapter} />)
    );
};

export default Chapters;