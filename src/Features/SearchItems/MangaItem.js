import React from 'react';
import MangaStatus from '../../Components/Manga/MangaStatus';
import { Comments, Follows, Rating, Seen } from '../../SharedUI/Statistics';

const MangaItem = ({ status }) => {
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            {
                status ? <MangaStatus status={status} /> : true 
            }
            <div className="search-modal-statistics" style={{display: 'flex'}}>
                <Rating statistic={[]} />
                <Follows statistic={[]} />
                <Seen statistic={[]} />
                <Comments statistic={[]} />
            </div>
        </div> 
    );
};

export default MangaItem;