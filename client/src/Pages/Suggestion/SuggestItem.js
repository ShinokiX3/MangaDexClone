import React from 'react';
import PageArrowLink from '../../SharedUI/PagesLinks/PageArrowLink';

const SuggestItem = ({ children, title = '', link = '' }) => {
    return (
        <div className="suggest-item">
            <PageArrowLink title={title} link={link} />
            <div className="suggest-item-content">
                { children }
            </div>
        </div>
    );
};

export default SuggestItem;