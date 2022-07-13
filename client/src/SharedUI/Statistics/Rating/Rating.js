import React from 'react';
import { StarIcon } from '../../../Assets/Svg/Statistics';

const Rating = ({ statistic }) => {
    return (
        <div className="rating" style={{display: 'flex'}}>
            <StarIcon alt="" />
            <p>{statistic?.score || "9.5"}</p>
        </div>
    );
};

export default Rating;