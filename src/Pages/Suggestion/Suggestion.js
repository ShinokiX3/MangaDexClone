import { memo, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestUpdates, fetchRecentlyAdded, fetchSeasonal } from '../../Store/Slices/suggestSlice';

import MainContainer from '../../Layouts/MainContainer/MainContainer';
import SuggestItem from './SuggestItem';

import MangaItems from '../../Components/Manga/MangaVariables/MangaItems';
import LatestUpdates from '../../Components/Suggestions/LatestUpdates/LatestUpdates';
import './suggestion.scss';

import Slider from '../../Features/Slider/Slider';
import SliderItem from '../../Features/Slider/SliderItem';

import MangaVar1 from '../../Components/Manga/MangaVariables/MangaVar1';
import MangaVar2 from '../../Components/Manga/MangaVariables/MangaVar2';
import Spinner from '../../SharedUI/LoadComponents/Spiner/Spinner';

const Suggestion = memo(() => {
    const dispatch = useDispatch();

    const seasonal = useSelector(state => state.suggest.seasonal);
    const latestUpdates = useSelector(state => state.suggest.latestUpdates); 
    const recentlyAdded = useSelector(state => state.suggest.recentlyAdded);

    useEffect(() => {
        dispatch(fetchSeasonal());
        dispatch(fetchLatestUpdates());
        dispatch(fetchRecentlyAdded());
    }, [])

    return (
        <MainContainer mainClasses='suggestion-page' containerClasses='suggest-content' isHeaderBlack >
            <SuggestItem title='Seasonal' link='titles/seasonal' >
                {
                    seasonal.load.status === 'loading' ?
                    <Spinner customStyle={{width: '50px', height: '50px'}} />
                    :
                    <Slider>
                        <MangaItems mangas={seasonal?.data} 
                            Variant={MangaVar1} 
                            Wrapp={SliderItem}
                            styles={{display: "flex", height: "228px"}}
                        />
                    </Slider>
                }
            </SuggestItem>

            <SuggestItem title='Latest Updates' link='' >
                <LatestUpdates chapters={latestUpdates?.data} />
            </SuggestItem>

            <SuggestItem title='Recently added' link='titles/recently' >
                {
                    recentlyAdded.load.status === 'loading' ?
                    <Spinner customStyle={{width: '50px', height: '50px'}} />
                    : 
                    <Slider>
                        <MangaItems mangas={recentlyAdded?.data} 
                            Variant={MangaVar2} 
                            Wrapp={SliderItem} 
                            styles={{display: "flex", width: "128px", height: "180px"}} 
                        />
                    </Slider>
                }
            </SuggestItem>
        </MainContainer>    
    );
});

export default Suggestion;