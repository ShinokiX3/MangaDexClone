import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../../Store/Actions/manga';

const CheckboxSelector = (props) => {
    const dispatch = useDispatch();

    const { checkboxData, typeName } = props;
    const { title, array } = checkboxData;
    
    const [typeSelected, setTypeSelected] = useState([]);

    const setProperty = (e, id) => {
        if (e.target.checked === true) {
            setTypeSelected([...typeSelected, id ]);
        } else {
            const delIdx = typeSelected.findIndex(el => el === id);
            setTypeSelected([...typeSelected.slice(0, delIdx), ...typeSelected.slice(delIdx+1)]);
        }
    }

    useEffect(() => {
        dispatch(setFilters({name: typeName, arr: typeSelected}));
    }, [typeSelected])

    return (
        <div className="checkbox-selector">
            <h3>{title}</h3>
                <div className="checkbox-block">
                    {
                        array.map(({id, title: subTitle}) => (
                            <div key={subTitle} >
                                <input type="checkbox" id={subTitle} name={subTitle} value="yes"
                                    onChange={(e) => setProperty(e, id)} />
                                <label htmlFor={subTitle} >{subTitle}</label>
                            </div>
                        ))
                    }
                </div>
        </div>
    );
};

// 'checkbox-el' - id of input

export default CheckboxSelector;