import React from 'react';

const CoverModal = ({ src = '', alt = '' }) => {
    return (
        <img src={src} alt={alt} style={{maxHeight: '100%'}} />
    );
};

export default CoverModal;