import React from 'react';

const CoverModal = ({ setActive = null, src = '', alt = '' }) => {
    return (
        <img src={src} alt={alt} style={{maxHeight: '100%'}} />
    );
};

export default CoverModal;