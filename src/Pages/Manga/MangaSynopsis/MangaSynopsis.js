import React, { memo } from 'react';

const MangaSynopsis = memo(({ description }) => {
    return (
        <div className="synopsis">
            <p>{description}</p>
        </div>
    );
});

export default MangaSynopsis;