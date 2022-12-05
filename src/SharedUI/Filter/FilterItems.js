import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTags } from '../../Store/Slices/titlesSlice';
import { strToUpper } from '../../Utils/stringToUpperCase';
import styles from './filter-items.module.scss';
import FilterItemsViev from './FilterItemsViev';

const FilterItems = ({ items = [], isSpecific = false, type = '' }) => {
    const [values, setValues] = useState([]);
    const [canChange, setCanChange] = useState(true);
    
    const refAny = useRef(null);

    const dispatch = useDispatch();
    const selectedTags = useSelector(state => state.title.selectedTags.data);

    useEffect(() => {
        if (values && canChange) {
            dispatch(setSelectedTags({type: type, tags: values}));
        }
    }, [values]);

    useEffect(() => {
        setCanChange(false);
        const idxInTypes = selectedTags.findIndex(tag => tag.type === type);
        setValues(selectedTags[idxInTypes].tags);
    }, [selectedTags]); 

    const handleClick = (e) => {
        const tagId = e.target.dataset.id;
        setCanChange(true);

        if (!values.some((val) => val.value === e.target.innerHTML) || values.length === 0) {
            setValues([...values, {status: 'include', value: e.target.innerHTML, id: tagId}]);
            
            e.target.classList.add('filter-tag');
            e.target.classList.add(styles.include);
        }
        if (values.some((val) => val.value === e.target.innerHTML && val.status === 'include' && val.id) && values.length > 0) {
            const index = values.findIndex((val) => val.value === e.target.innerHTML);
            const newObj = {status: 'exclude', value: values[index].value, id: tagId};
            
            setValues([...values.slice(0, index), newObj, ...values.slice(index + 1)]);
            
            e.target.classList.remove(styles.include);
            e.target.classList.add(styles.exclude);
        }
        if ( values.some((val) => (val.value === e.target.innerHTML && val.status === 'exclude') 
             || (val.value === e.target.innerHTML && val.status === 'include' && !val.id)) 
             && values.length > 0) {
            const index = values.findIndex((val) => val.value === e.target.innerHTML);
            
            setValues([...values.slice(0, index), ...values.slice(index + 1)]);
            
            e.target.classList.remove('filter-tag');
            e.target.classList.remove(styles.include);
            e.target.classList.remove(styles.exclude);
        }
    }

    return (
        <>
        <h3>{strToUpper(type)}</h3>
        <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
            {items?.map((item, index) => (
                <FilterItemsViev key={item?.attributes?.name?.en ?? item} title={item?.attributes?.name?.en ?? item} id={item?.id} handleClick={handleClick} />
            ))}
            {isSpecific ? 
                <FilterItemsViev key={1} cRef={refAny} title='Any' style={`${values.length === 0 ? `${styles.any}` : ``}`} />
                :
                null
            }
        </div>
        </>
    );
};

export default FilterItems;