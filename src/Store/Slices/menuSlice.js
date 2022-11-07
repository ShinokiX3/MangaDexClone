const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    readerMenu: {
        title: 'readerMenu',
        status: false
    },
    mainMenu: {
        title: 'mainMenu',
        status: false
    }
}

// immutable functions in reducers, but we can avoid strict syntax in changing state by redux/toolkit
// state = {...state, menuType: {status: action.payload}}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMainStatus(state, action) {
            state.mainMenu.status = action.payload
        },
        setReaderStatus(state, action) {
            state.readerMenu.status = action.payload
        }
    }
})

export const { setMainStatus, setReaderStatus } = menuSlice.actions;

export default menuSlice.reducer;