import React from 'react';
import { FollowIcon } from '../../../Assets/Svg/Statistics';

const Follows = ({ statistic }) => {
    return (
        <div className="follows" style={{display: 'flex'}}>
            <FollowIcon alt="" />
            <p>{statistic?.follows || "9.5"}</p>
        </div>
    );
};

export default Follows;