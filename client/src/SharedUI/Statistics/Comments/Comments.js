import React from 'react';
import { CommentsIcon } from '../../../Assets/Svg/Statistics';

const Comments = ({ statistic }) => {
    return (
        <div className="comments-icon" style={{display: 'flex'}}>
            <CommentsIcon />
            <p>{statistic?.seen || "N/A"}</p>
        </div>
    );
};

export default Comments;