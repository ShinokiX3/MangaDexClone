import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredData } from '../../../Store/Slices/titlesSlice';

const useFetchByFilters = () => {
    const dispatch = useDispatch();
    const selectedTags = useSelector(state => state.title.selectedTags.data);
    const title = useSelector(state => state.title.title.data);
    const order = useSelector(state => state.title.order.data);
    const mangaIds = useSelector(state => state.title.ids.data);

    const includeIds = [];
    const excludeIds = [];

    const pubDemographic = [];
    const rating = [];
    const status = [];

    selectedTags.forEach(el => {
        el.tags.forEach(tag => {
            if (tag?.status === 'include' && tag?.id) {
                includeIds.push(tag?.id);
            }
            if (tag?.status === 'exclude' && tag?.id) {
                excludeIds.push(tag?.id);
            }
        })
        if (el.type === 'Demographic') {
            pubDemographic.push(...el.tags.map(tag => tag.value.toLowerCase()));
        }
        if (el.type === 'Content Rating') {
            rating.push(...el.tags.map(tag => tag.value.toLowerCase()));
        }
        if (el.type === 'Publication Status') {
            status.push(...el.tags.map(tag => tag.value.toLowerCase()));
        }
    })

    return () => dispatch(fetchFilteredData({includeIds, excludeIds, pubDemographic, rating, status, title, order, mangaIds}));
};

export default useFetchByFilters;