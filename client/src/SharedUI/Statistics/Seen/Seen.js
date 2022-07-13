import React from 'react';
import { SeenIcon } from '../../../Assets/Svg/Statistics';

const Seen = ({ statistic }) => {
    return (
        <div className="seen" style={{display: 'flex'}}>
            <SeenIcon alt="" />
            <p>{statistic?.seen || "N/A"}</p>
        </div>
    );
};

export default Seen;