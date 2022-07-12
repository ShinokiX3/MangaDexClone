import React from 'react';
import MangaItem from './MangaItem';

const MangaItems = (props) => {
    const { mangaList } = props;
    return (
        <div className='manga-items'>
            {
                mangaList.map((el, idx) => {
                    return <MangaItem manga={el} key={el.title + idx} />
                })
            }
        </div>
    );
};

export default MangaItems;