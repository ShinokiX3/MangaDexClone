import React from 'react';
import { FollowIcon } from '../../../Assets/Svg/Statistics';

const Follows = ({ follows }) => {
    return (
        <div className="follows" style={{display: 'flex', cursor: 'pointer'}}>
            <FollowIcon alt="" />
            <p>{follows || "9.5"}</p>
        </div>
    );
};

export default Follows;