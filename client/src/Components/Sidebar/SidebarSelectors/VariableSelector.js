import React from 'react';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { setFilters } from '../../../Actions/manga';

const VariableSelector = (props) => {
    const dispatch = useDispatch();

    const { title, typeName } = props;
    
    const [inputsData, setInputsData] = useState({from: '', to: ''});

    const changeInputsData = (e) => {
        if (e.target.placeholder === 'From') {
            setInputsData({...inputsData, from: e.target.value})
        } else {
            setInputsData({...inputsData, to: e.target.value})
        }
        // Пока тестовое, без кнопки поиска добавление при каждом вводе нового символа
    }

    useEffect(() => {
        dispatch(setFilters({name: typeName, arr: [inputsData]}))
    }, [inputsData])

    return (
        <div className="varible-selector">
            <h3>{title}</h3>
            <div>
                <input type="text" 
                    placeholder='From'
                    value={inputsData.from}
                    onChange={(e) => changeInputsData(e)} />
                <span>-</span>
                <input type="text" 
                    placeholder='To'
                    value={inputsData.to}
                    onChange={(e) => changeInputsData(e)} />
            </div>
        </div>
    );
};

export default VariableSelector;