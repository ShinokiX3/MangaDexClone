import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MangaDexApi from "../../Services/MangaDexApi";
import { collectData } from "../../Utils/layoutData";

export const fetchMangaInfo = createAsyncThunk(
    'manga/fetchMangaInfo',
    async function({ mangaId }, {rejectWithValue, dispatch}) {
        try {
            const response = await MangaDexApi.getMangaInfo(mangaId);
            if (!response.ok) {
                throw new Error('Something is going wrong...');
            }
            const data = await response.json();
            dispatch(setMangaInfo(data.data));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchMangaStatistics = createAsyncThunk(
    'manga/fetchMangaStatistics',
    async function({ mangaId }, {rejectWithValue, dispatch}) {
        try {
            const response = await MangaDexApi.getMangaStatistics(mangaId);
            if (!response.ok) {
                throw new Error('Something is going wrong...');
            }
            const data = await response.json();
            dispatch(setStatistics(data['statistics']));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchMangaCovers = createAsyncThunk(
    'manga/fetchMangaCovers',
    async function({ mangaId, offset = 0 }, {rejectWithValue, dispatch}) {
        try {
            const response = await MangaDexApi.getMangaCoversByVolumes(mangaId, offset);
            // if (!response.ok) {
            //     throw new Error('Something is going wrong...');
            // }
            // const data = await response.json();
            dispatch(setCovers(response));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchMangaFeed = createAsyncThunk(
    'manga/fetchMangaAuthor',
    async function({ mangaId, offset = 0 }, {rejectWithValue, dispatch}) {
        try {
            const response = await MangaDexApi.getMangaFeed(mangaId, offset);
            if (!response.ok) {
                throw new Error('Something is going wrong...');
            }
            const data = await response.json();
            dispatch(setFeed({total: data.total, array: collectData(data.data, 'volume')}));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchMangaAuthor = createAsyncThunk(
    'manga/fetchMangaAuthor',
    async function({ authorId }, {rejectWithValue, dispatch}) {
        try {
            const response = await MangaDexApi.getAuthorInfo(authorId);
            if (!response.ok) {
                throw new Error('Something is going wrong...');
            }
            const data = await response.json();
            dispatch(setAuthor(data.data));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const initialState = {
    mangaInfo: {
        load: {
            status: '',
            error: null
        },
        data: null
    },
    statistics: {
        load: {
            status: '',
            error: null
        },
        data: null
    },
    authors: {
        load: {
            status: '',
            error: null
        },
        data: null
    },
    feed: {
        load: {
            status: '',
            error: null
        },
        data: null
    },
    covers: {
        load: {
            status: '',
            error: null
        },
        data: null
    }
}

const setLoading = (state, action, selector) => {
    state[selector].load.status = 'loading';
    state[selector].load.error = null;
}

const setResolved = (state, action, selector) => {
    state[selector].load.status = 'resolved';
    state[selector].load.error = null;
}

const setError = (state, action, selector) => {
    state[selector].load.status = 'rejecred';
    state[selector].load.error = action.payload;
}

const mangaSlice = createSlice({
    name: 'manga',
    initialState,
    reducers: {
        setMangaInfo(state, action) {
            state.mangaInfo.data = action.payload;
        },
        setStatistics(state, action) {
            state.statistics.data = action.payload;
        },
        setCovers(state, action) {
            state.covers.data = action.payload;
        },
        setFeed(state, action) {
            state.feed.data = action.payload;
        },
        setAuthor(state, action) {
            state.authors.data = action.payload;
        }
    },
    extraReducers: {
        [fetchMangaInfo.pending]: (state, action) => setLoading(state, action, 'mangaInfo'),
        [fetchMangaInfo.fulfilled]: (state, action) => setResolved(state, action, 'mangaInfo'),
        [fetchMangaInfo.rejected]: (state, action) => setError(state, action, 'mangaInfo'),

        [fetchMangaStatistics.pending]: (state, action) => setLoading(state, action, 'statistics'),
        [fetchMangaStatistics.fulfilled]: (state, action) => setResolved(state, action, 'statistics'),
        [fetchMangaStatistics.rejected]: (state, action) => setError(state, action, 'statistics'),

        [fetchMangaCovers.pending]: (state, action) => setLoading(state, action, 'covers'),
        [fetchMangaCovers.fulfilled]: (state, action) => setResolved(state, action, 'covers'),
        [fetchMangaCovers.rejected]: (state, action) => setError(state, action, 'covers'),

        [fetchMangaAuthor.pending]: (state, action) => setLoading(state, action, 'authors'),
        [fetchMangaAuthor.fulfilled]: (state, action) => setResolved(state, action, 'authors'),
        [fetchMangaAuthor.rejected]: (state, action) => setError(state, action, 'authors'),

        [fetchMangaFeed.pending]: (state, action) => setLoading(state, action, 'feed'),
        [fetchMangaFeed.fulfilled]: (state, action) => setResolved(state, action, 'feed'),
        [fetchMangaFeed.rejected]: (state, action) => setError(state, action, 'feed')
    }
})

export const { setMangaInfo, setAuthor, setStatistics, setCovers, setFeed } = mangaSlice.actions

export default mangaSlice.reducer;