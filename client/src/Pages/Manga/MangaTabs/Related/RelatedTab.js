import { memo, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Card from '../../../../Features/Cards/Cards';
import { filterSomeAttributes } from '../../../../Utils/filterSomeAttributes';

const RelatedTab = memo(() => {
    const mangaInfo = useSelector(state => state.manga.mangaInfo);

    const selectors = useMemo(() => ['colored', 'preserialization', 'doujinshi'], []);
    const mangasArr = useMemo(() => filterSomeAttributes(mangaInfo.data.relationships, selectors), [selectors]);

    useEffect(() => {
        console.log(mangasArr);   
    });

    return ( 
        mangaInfo.load.status === 'resolved' ?
        <Card mangasArr={mangasArr} />
        :
        null
    )
});

export default RelatedTab;