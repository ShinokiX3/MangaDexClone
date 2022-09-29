import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LinkList = ({ico, title = "", isSvg = false, bgColor = '', children}) => {
    return (
        <div className="links-block" style={isSvg ? {margin: '0px', padding: '5px', marginBottom: '10px', backgroundColor: bgColor} : {}}>
            <div style={{display: "flex"}} className="svg-link link">
                {
                    !isSvg ?
                    <FontAwesomeIcon icon={ico} />
                    :
                    ico
                }
                <p>{title}</p>
            </div>
            {
                !isSvg ?
                <div className="a-links">
                {
                    children
                }
                </div>
                :
                null
            }
        </div>
    );
};

export default LinkList;