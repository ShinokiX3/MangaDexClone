import { memo, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredData, fetchFilterTags } from '../../Store/Slices/titlesSlice';
import styles from './titles.module.scss';

import MainContainer from '../../Layouts/MainContainer/MainContainer';
import PageArrowLink from '../../SharedUI/PagesLinks/PageArrowLink';
import FilterTitles from './FilterTitles/FilterTitles';

import { findOutUniqGroups } from '../../Utils/groupElemsBy';
import { compose } from '../../Utils/compose';
import { sortByTagsLength } from './Utils/SortByLength';
import { sortTagsByAlphabet } from './Utils/SortByAlphabet';
import Cards from '../../Features/Cards/Cards';
import Select from '../../SharedUI/StyledComponents/Select/Select';
import Spinner from '../../SharedUI/LoadComponents/Spiner/Spinner';

const Titles = memo(() => {
    const [groupedTags, setGroupedTags] = useState([]);
    const [selected, setSelected] = useState('Best Match');

    const params = useParams();
    const titlesId = params['*'];

    const dispatch = useDispatch();
    const filterTags = useSelector(state => state.title.filterTags);
    const filteredManga = useSelector(state => state.title.filteredData);

    // TODO: take data from global titles page state to children component

    const sortValues = useMemo(() => [
        'Best Match',
        'Latest Upload',
        'Oldest Upload',
        'Title Ascending',
        'Title Descending',
        'Highest Rating',
        'Lowest Rating',
        'Most Follows',
        'Fewest Follows',
        'Recently Added',
        'Oldest Added',
        'Year Ascending',
        'Year Descending'
    ], [])

    useEffect(() => {
        dispatch(fetchFilterTags());
        const includeIds = [];
        const excludeIds = []; 
        dispatch(fetchFilteredData({includeIds, excludeIds}));
    }, []);

    useEffect(() => {
        if (filterTags.data) {
            compose(
                setGroupedTags,
                sortTagsByAlphabet,
                sortByTagsLength,
                findOutUniqGroups
            )(filterTags.data);
        }
    }, [filterTags.data]);

    // TODO: paint some tags in different colors 

    return (
        <MainContainer mainClasses={styles.wrapp} containerClasses={styles.container} isHeaderBlack >
            <PageArrowLink title='Advanced search' link='' arrowReDirection />        
            <FilterTitles tags={groupedTags} />
            <ComponentByStatus filteredManga={filteredManga} sortValues={sortValues} selected={selected} setSelected={setSelected} />
        </MainContainer>
    );
});

const ComponentByStatus = memo(({ filteredManga, sortValues, selected, setSelected }) => {
    switch(filteredManga.load.status) {
        case 'loading': return (
            <Spinner customStyle={{width: '35px', height: '35px', marginTop: '15px'}} />
        )
        case 'resolved': return (
            <Cards mangasArr={filteredManga.data}>
                <Select values={sortValues} selected={selected} setSelected={setSelected} selectTitle='Sort By' />
            </Cards>
        )
        case 'error': return (
            <div>Error...</div>
        )
        default: return (
            <></>
        )
    }
})

export default Titles;