const FETCH_MANGA = 'FETCH_MANGA';
const SET_FILTER_DATA = 'SET_FILTER_DATA';
const FETCH_FILTERED_DATA = 'FETCH_FILTERED_DATA'

const defaultState = {
    mangaList: [],
    mangaFilterData: {}
};

export const mangaReducer = (state = defaultState, action) => {
    switch(action.type) {
        case FETCH_MANGA: 
            return {...state, mangaList: [...state.mangaList, ...action.payload]};
        case SET_FILTER_DATA:
            return {...state, mangaFilterData: {...state.mangaFilterData, [action.payload.name]: [...action.payload.arr] }};
        case FETCH_FILTERED_DATA:
            return {...state, mangaList: [...action.payload]};
        default:
            return state;
    }
}

// action creators

export const fetchMangaAction = (payload) => ({type: FETCH_MANGA, payload});
export const setFilterData = (payload) => ({type: SET_FILTER_DATA, payload});
export const fetchFilteredData = (payload) => ({type: FETCH_FILTERED_DATA, payload});