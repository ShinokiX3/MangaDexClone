import React from 'react';
import { useState } from 'react';
import './sidebar.scss';

import TypeSidebar from './TypesSidebar/TypeSidebar';
import { ChooseSelector, VariableSelector, CheckboxSelector } from './SidebarSelectors';
import { GENRES, STATUS, TYPES, VOLUMES } from './filterData';

const Sidebar = () => {
    const [typebarData, setTypebarData] = useState([]);
    const [chosenData, setChosenData] = useState([]);
    const [toggleTypebar, setToggleTypebar] = useState('');
    const [hideSidebar, setHideSidebar] = useState('');
    const [typeName, setTypeName] = useState('');

    const openTypebarBy = (type) => {
        setHideSidebar('hide-sidebar');
        if (type === 'Genres') {
            setTypebarData(GENRES)
            setToggleTypebar('toggle-typebar');
            setTypeName('genre');
        } else if (type === 'Tags') {
            setTypebarData(['one', 'two', 'three'])
            setToggleTypebar('toggle-typebar');
        }
    }

    return (
        <div className={`sidebar ${hideSidebar}`}>
            <TypeSidebar data={typebarData} status={toggleTypebar} setTypebarStatus={setToggleTypebar} 
                setSidebarOverflow={setHideSidebar} typeName={typeName} />
            <ChooseSelector title={'Genres'} chosenData={chosenData} func={openTypebarBy} />
            <ChooseSelector title={'Tags'} chosenData={chosenData} func={openTypebarBy} />
            <VariableSelector title={'Chapters'} typeName={'chapters'} />
            <VariableSelector title={'Year of issue'} typeName={'date'} />
            <VariableSelector title={'Grade'} typeName={'score'} />
            <CheckboxSelector checkboxData={ VOLUMES } typeName={'rated'} />
            <CheckboxSelector checkboxData={ TYPES } typeName={'type'} />
            <CheckboxSelector checkboxData={ STATUS } typeName={'status'} />
        </div>
    );
};

export default Sidebar;