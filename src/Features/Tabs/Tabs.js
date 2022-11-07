import React from 'react';
import './tabs.scss';

const Tabs = ({ handleTabs, tabs = ['Chapters', 'Art', 'Related'] }) => {
    return (
        <div className="selectors" onClick={handleTabs}>
            {tabs.map((tab, idx) => <span className={idx !== 0 ? 'select-tab' : 'select-tab active'}>{tab}</span>)}
        </div>
    );
};

export default Tabs;