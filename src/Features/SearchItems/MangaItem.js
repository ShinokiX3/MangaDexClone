import React from 'react';
import { useMemo } from 'react';
import MangaStatus from '../../Components/Manga/MangaStatus';
import { Comments, Follows, Rating, Seen } from '../../SharedUI/Statistics';

const MangaItem = ({ status, statistics }) => {
    const stats = useMemo(() => {
        if (!!statistics) {
            return Object.values(statistics)[0];
        }
    }, [statistics]);

    return (
        <div className="manga-item-wrapper" style={{display: 'flex', alignItems: 'center'}}>
            {
                status ? <MangaStatus status={status} /> : true 
            }
            <div className="search-modal-statistics" style={{display: 'flex'}}>
                {!!stats
                    ? <>
                      <Rating rating={stats.rating} />
                      <Follows follows={stats.follows} />
                      </>
                    : null
                }
                <Seen statistic={[]} />
                <Comments statistic={[]} />
            </div>
        </div> 
    );
};

export default MangaItem;