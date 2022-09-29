import React, { memo } from 'react';
import Additional from '../../../../Components/AdditionalInfo/Additional';
import Volumes from '../../../../Components/VolumesFeed/Volumes';
import styles from './chapters_tab.module.scss';

const ChaptersTab = memo(({ mangaId }) => {
    return (
        <div className={styles.wrapp}>
            <div className="more-info">
                <Additional />
            </div>
            <div className="chapters-choose">
                <Volumes mangaId={mangaId}/>
            </div>
        </div>
    );
});

export default ChaptersTab;