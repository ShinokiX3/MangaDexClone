import React from 'react';
import MangaItem from './MangaItem';

const MangaItems = (props) => {
    const { mangaList } = props;
    return (
        <div className='manga-items'>
            {
                mangaList?.map((el, idx) => {
                    return <MangaItem key={el.title + ' ' + idx} manga={el} />
                })
            }
        </div>
    );
};

export default MangaItems;