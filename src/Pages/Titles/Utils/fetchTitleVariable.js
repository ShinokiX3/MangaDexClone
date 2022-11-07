import MangaDexApi from '../../../Services/MangaDexApi';
import { getMangasIds } from '../../../Utils/getMangaIds';

const fetchTitleVariable = async (variable) => {
    switch(variable) {
        case 'seasonal': 
            const seasonalList = await MangaDexApi.getSeasonal().then(data => data.json());
            const mangaIds = getMangasIds(seasonalList.data.relationships);
            return await MangaDexApi.getSeasonalInfo(mangaIds).then(data => data.json());
        case 'recently':
            return await MangaDexApi.getRecentlyAdded().then(data => data.json());
        case 'latest': return await MangaDexApi.getLatestUpdateChapters();
        default: return {data: []};
    }
};

export default fetchTitleVariable;