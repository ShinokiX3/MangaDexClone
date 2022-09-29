import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setFilters } from '../../../OldStore/Actions/manga';
import './typeSidebar.scss'

const TypeSidebar = (props) => {
    const dispatch = useDispatch();

    const { data, status, setTypebarStatus, setSidebarOverflow, typeName } = props;
    
    const [typeSelected, setTypeSelected] = useState([]);
    const [typebarFilter, setTypebarFilter] = useState('');

    const closeTypebar = () => {
        setTypebarStatus('');
        setSidebarOverflow('');
    }

    const setProperty = (e, id) => {
        if (e.target.checked === true) {
            setTypeSelected([...typeSelected, {tgName: e.target.name, id} ]);
        } else {
            const delIdx = typeSelected.findIndex(el => el.tgName === e.target.name);
            setTypeSelected([...typeSelected.slice(0, delIdx), ...typeSelected.slice(delIdx+1)]);
        }
    }
    
    const setCheckedFilters = () => {
        dispatch(setFilters({name: typeName, arr: typeSelected}));
    }

    const handleTypebarFilter = (e) => {
        setTypebarFilter(e.target.value);
    }

    const handleReset = () => {
        setTypeSelected([]);
        setCheckedFilters();
    }

    const paintData = ({title, elems}) => {
        return (
            <>
                <h3>{title}</h3>
                {
                    elems.map(({id, title}) => (
                        <div className="select-block-elem" key={title}>
                            <input type="checkbox" id={title} name={title} 
                                onChange={(e) => setProperty(e, id)} />
                            <label htmlFor={title}>{title}</label>
                        </div>
                    ))
                }
            </>
        )
    }

    return (
        <div className={`type-sidebar ${status}`}>
            <div className="back-block">
                    <span onClick={() => closeTypebar()}>Back</span>
                    <span onClick={() => handleReset()}>Reset</span>
            </div>
            <input type="text" 
                value={typebarFilter} 
                placeholder={`Filter by ${'genres'}`}
                onChange={(e) => handleTypebarFilter(e)} />
            <>
                {
                    data.map((el, index) => (
                        <div className="select-block" key={index} >
                            { 
                                paintData(el) 
                            }
                        </div>
                    ))
                }
            </>
            <div className="select-block">
            </div>
            <input type="button" value={'Submit'} onClick={() => setCheckedFilters()} />
        </div>
    );
};

export default TypeSidebar;