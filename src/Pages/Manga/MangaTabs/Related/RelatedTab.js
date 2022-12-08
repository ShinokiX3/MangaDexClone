import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Cards from '../../../../Features/Cards/Cards';
import { filterSomeAttributes } from '../../../../Utils/filterSomeAttributes';

const RelatedTab = memo(() => {
    const mangaInfo = useSelector(state => state.manga.mangaInfo);

    const selectors = useMemo(() => ['colored', 'preserialization', 'doujinshi'], []);
    const mangasArr = useMemo(() => filterSomeAttributes(mangaInfo.data.relationships, selectors).filter(el => !!el), [selectors]);
    return ( 
        mangaInfo.load.status === 'resolved' ?
        <Cards mangasArr={mangasArr} >
            <p style={{fontWeight: '700', fontSize: '14.5pt', color: '#242424'}}>Related Titles</p>
        </Cards>
        :
        null
    )
});

export default RelatedTab;