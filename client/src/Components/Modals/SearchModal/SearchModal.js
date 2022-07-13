import React, { useEffect, useState } from 'react';
import MangaDexApi from '../../../Services/MangaDexApi';
import Spinner from '../../../SharedUI/LoadComponents/Spiner/Spinner';
import SearchItems from './SearchItems';

const SearchModal = ({setActive}) => {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState({
        mangas: [],
        groups: [],
        authors: []
    })

    const handleSearchInput = (e) => {
        setValue(e.target.value);
    }

    const searchData = async() => {
        const mangas = await MangaDexApi.getSearcedManga(value);
        const authors = await MangaDexApi.getSearcedAuthor(value);
        const groups = await MangaDexApi.getSearcedGroup(value);

        setSearchValue({mangas: mangas?.data.slice(0, 5), groups: groups?.data.slice(0, 5), authors: authors?.data.slice(0, 5)})
        setIsLoading(false);
    }

    useEffect(() => {
        if (isLoading !== true) {
            setIsLoading(true);
            // Change useState isLoading to useMemo
        }
        const timeout = setTimeout(() => {
            if (value.length >= 1) {
                setIsLoading(true);
                searchData();
            }
        }, 500)
        return () => {
            clearTimeout(timeout);
        }
    }, [value]);

    return (
        <div className="seach-modal">
            <p className="search-header">Search</p>
            <input type="text"
                className="search-block search-input" 
                placeholder="Search"
                value={value}
                onChange={handleSearchInput} 
                autoFocus
            />
            {
                value.length <= 1 ? <div></div> :
                (isLoading ? <Spinner customStyle={{width: '40px', height: '40px', marginTop: '20px'}} /> 
                :
                ( searchValue.mangas.length < 1 ? <div className="search-noresults">No results found</div> : 
                <>
                    <SearchItems items={searchValue.mangas} title={"Manga"} setActive={setActive}/>
                    <SearchItems items={searchValue.groups} title={"Group"} setActive={setActive}/>
                    <SearchItems items={searchValue.authors} title={"Author"} setActive={setActive}/>
                </>)
                )
            }
        </div>
    );
};

export default SearchModal;