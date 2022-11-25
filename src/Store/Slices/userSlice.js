import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem('user'));

export const refreshToken = createAsyncThunk(
    'title/refreshToken',
    async function(_, {rejectWithValue, dispatch}) {
        try {
            const resp = await fetch('https://infinite-sea-32007.herokuapp.com/https://api.mangadex.org/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: user.refreshToken
                })
            }).then(data => data.json());

            if (resp.result === 'ok') {
                const expires = new Date().valueOf() + 15 * 60000;
    
                const refreshedUser = {
                    username: user.username,
                    expires,
                    sessionToken: resp.token.session,
                    refreshToken: resp.token.refresh
                }

                localStorage.setItem('user', JSON.stringify(refreshedUser));
                dispatch(setUser(refreshedUser));
            }
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
    }
})

export const { setUser, setToInitial } = userSlice.actions;

export default userSlice.reducer;