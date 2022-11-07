import React from 'react';

const Role = ({ title = 'Undefined role', src = 'url' }) => {
    const handleClick = () => {
        console.log('to src ' + src);
    }
    return (
        <span 
            style={{
                backgroundColor: '#f0f1f2', 
                fontSize: '12.5pt', 
                fontWeight: '550',
                color: '#242424', 
                padding: '3px 10px 3px 10px', 
                marginRight: '5px'
            }}
            onClick={handleClick}>
            {title}
        </span>
    );
};

export default Role;