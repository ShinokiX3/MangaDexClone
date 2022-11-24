import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem('user'));

export const refreshToken = createAsyncThunk(
    'title/refreshToken',
    async function(_, {rejectWithValue, dispatch}) {
        try {
            
        } catch (error) {
            
        }
    }
)

const initialState = {
    user: user ? user : {
        username: '',
        sessionToken: '',
        refreshToken: '',
        expires: ''
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

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setToInitial(state, action) {
            state.user = {
                username: '',
                sessionToken: '',
                refreshToken: '',
                expires: ''
            }
        }
    },
    extraReducers: {
        [refreshToken.pending]: (state, action) => setLoading(state, action, 'filterTags'),
        [refreshToken.fulfilled]: (state, action) => setResolved(state, action, 'filterTags'),
        [refreshToken.rejected]: (state, action) => setError(state, action, 'filterTags'),
    }
})

export const { setUser, setToInitial } = userSlice.actions;

export default userSlice.reducer;