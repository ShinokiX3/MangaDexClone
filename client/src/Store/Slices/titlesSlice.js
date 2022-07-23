import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MangaDexApi from "../../Services/MangaDexApi";

export const fetchFilterTags = createAsyncThunk(
    'suggest/fetchFilterTags',
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

// export const fetchFilteredData = createAsyncThunk(
//     'suggest/fetchFilterTags',
//     async function({filterTags}, {rejectWithValue, dispatch}) {
//         try {
//             const response = await MangaDexApi.getFilterTags();

//             if (!response.ok) {
//                 throw new Error('Something is going wrong...');
//             }

//             const filterTags = await response.json();

//             dispatch(setFilterTags(filterTags.data));
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// )

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
        }
    },
    extraReducers: {
        [fetchFilterTags.pending]: (state, action) => setLoading(state, action, 'filterTags'),
        [fetchFilterTags.fulfilled]: (state, action) => setResolved(state, action, 'filterTags'),
        [fetchFilterTags.rejected]: (state, action) => setError(state, action, 'filterTags')
    }
})

export const { setFilterTags, filteredData } = titleSlice.actions;

export default titleSlice.reducer;