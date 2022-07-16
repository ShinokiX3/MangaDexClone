import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const SuggestItem = ({ children, title = '', handleNavigate }) => {
    return (
        <div className="suggest-item">
            <div className="suggest-name">
                <div href="" onClick={() => handleNavigate('seasonal')}>
                    <h1>{title}</h1>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
            <div className="suggest-item-content">
                { children }
            </div>
        </div>
    );
};

export default SuggestItem;