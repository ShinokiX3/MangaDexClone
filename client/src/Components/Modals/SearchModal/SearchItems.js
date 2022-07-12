import React, { useEffect, useState } from 'react';
import MangaDexApi from '../../../Services/MangaDexApi';
import SearchItem from './SearchItem';
import './searchPannel.scss';

const SearchItems = ({items, title, setActive}) => {
    return (
        <div className="sch-items-block">
            <h2>{title}</h2>
            <div className="sch-items">
                {
                    !items ? null :
                    items.map(item => (
                        <SearchItem item={item} type={title} key={item?.id} setActive={setActive} />
                    ))
                }
            </div>
        </div>
    );
};

export default SearchItems;