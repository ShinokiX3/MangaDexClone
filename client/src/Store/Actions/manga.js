import JikanApi from "../../Services/JikanApi";
import { fetchFilteredData, fetchMangaAction, setFilterData } from "../mangaReducer";

const fetchManga = (page, selector) => {
    return dispatch => {
        JikanApi.getMangaList(page, selector)
            .then(data => dispatch(fetchMangaAction(data?.top)))
    }
}

const setFilters = (data) => {
    return dispatch => {
        dispatch(setFilterData(data))
    }
}

const fetchFilterData = (data) => {
    return dispatch => {
        JikanApi.getMangaBySearch(data)
            .then(data => dispatch(fetchFilteredData(data?.results)))
    }
}

export {
    fetchManga,
    setFilters,
    fetchFilterData
}