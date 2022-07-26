import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MangaDexApi from "../../Services/MangaDexApi";

export const fetchFilterTags = createAsyncThunk(
    'title/fetchFilterTags',
    async function(_, {rejectWithValue, dispatch}) {
        try {
            const response = await MangaDexApi.getFilterTags();

            if (!response.ok) {
                throw new Error('Something is going wrong...');
            }

            const filterTags = await response.json();

            dispatch(setFilterTags(filterTags.data));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchFilteredData = createAsyncThunk(
    'title/fetchFilteredData',
    async function({includeIds = [], excludeIds = [], pubDemographic = [], rating = [], status = [], title = ''}, {rejectWithValue, dispatch}) {
        try {
            const response = await MangaDexApi.getFilteredData(includeIds, excludeIds, pubDemographic, rating, status, title);

            if (!response.ok) {
                throw new Error('Something is going wrong...');
            }

            const filteredData = await response.json();

            dispatch(setFilteredData(filteredData.data));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const initialState = {
    filterTags: {
        load: {
            status: 'loading',
            error: null
        },
        data: null
    },
    filteredData: {
        load: {
            status: 'loading',
            error: null
        },
        data: null
    },
    selectedTags: {
        data: [
        {
            type: 'Demographic',
            tags: []
        },
        {
            type: 'Content Rating',
            tags: []
        },
        {
            type: 'Publication Status',
            tags: []
        },
        {
            type: 'content',
            tags: []
        },
        {
            type: 'format',
            tags: []
        },
        {
            type: 'genre',
            tags: []
        },
        {
            type: 'theme',
            tags: []
        },
        ]
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

const titleSlice = createSlice({
    name: 'title',
    initialState,
    reducers: {
        setFilterTags(state, action) {
            state.filterTags.data = action.payload;
        },
        setFilteredData(state, action) {
            state.filteredData.data = action.payload;
        },
        setSelectedTags(state, action) {
            // state.selectedTags.data = [...state.selectedTags.data, action.payload];
            const index = state.selectedTags.data.findIndex(val => val.type === action.payload.type);
            state.selectedTags.data[index].tags = action.payload.tags;
        }
    },
    extraReducers: {
        [fetchFilterTags.pending]: (state, action) => setLoading(state, action, 'filterTags'),
        [fetchFilterTags.fulfilled]: (state, action) => setResolved(state, action, 'filterTags'),
        [fetchFilterTags.rejected]: (state, action) => setError(state, action, 'filterTags'),

        [fetchFilteredData.pending]: (state, action) => setLoading(state, action, 'filteredData'),
        [fetchFilteredData.fulfilled]: (state, action) => setResolved(state, action, 'filteredData'),
        [fetchFilteredData.rejected]: (state, action) => setError(state, action, 'filteredData')
    }
})

export const { setFilterTags, setSelectedTags, setFilteredData } = titleSlice.actions;

export default titleSlice.reducer;