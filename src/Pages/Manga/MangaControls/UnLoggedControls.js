import React from 'react';

import { BookIcon, ReportIcon, ShareIcon } from '../../../Assets/Svg/Manga';
import { FollowsIcon } from '../../../Assets/Svg/Manga';
import { DotsIcon } from '../../../Assets/Svg/Pagination';

const UnLoggedControls = ({ redirectToReader }) => {
    return (
        <>
        <button className="add-button">
            <FollowsIcon />
            <p>Add To Library</p>
        </button>
        <button className="read-button" onClick={redirectToReader}>
            <BookIcon />
            <p className="butt-with-ico">Start Reading</p>
        </button>
        <button className="report-button">
            <ReportIcon />
        </button>
        <button className="share-button">
            <ShareIcon />
        </button>
        <button className="hide-button">
            <DotsIcon />
        </button>
        </>
    );
};

export default UnLoggedControls;