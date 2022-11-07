const SET_CURRENT_MANGA = 'SET_CURRENT_MANGA';

const SET_MAIN_MENU_STATUS = 'SET_MENU_STATUS';
const SET_CHAPTER_MENU_STATUS = 'SET_CHAPTER_MENU_STATUS';

const SET_MENU_SCROLL = 'SET_MENU_SCROLL';
const SET_HEADER_REF = 'SET_HEADER_REF';

const defaultState = {
    userInfo: {
        login: '',
        password: ''
    },
    currentRead: {
        mangaId: '',
        mangaVolumes: []
    },
    menuStatus: {
        main: false,
        chapter: false,
        scroll: false
    },
    header: {
        ref: null
    }
};

export const userReducer = (state = defaultState, action) => {
    switch(action.type) {
        case SET_MAIN_MENU_STATUS: 
            return {...state, menuStatus: {...state.menuStatus, main: action.payload}};
        case SET_CHAPTER_MENU_STATUS:
            return {...state, menuStatus: {...state.menuStatus, chapter: action.payload}};
        case SET_MENU_SCROLL: 
            return {...state, menuStatus: {status: state.menuStatus.status, scroll: !state.menuStatus.scroll}};  
        case SET_HEADER_REF: 
            return {...state, header: {ref: action.payload}};    
        default:
            return state;
    }
}

// action creators

export const setCurrentManga = (payload) => ({type: SET_CURRENT_MANGA, payload});
export const setMenuScroll = (payload) => ({type: SET_MENU_SCROLL, payload});
export const setMainMenuStatus = (payload) => ({type: SET_MAIN_MENU_STATUS, payload});
export const setChapterMenuStatus = (payload) => ({type: SET_CHAPTER_MENU_STATUS, payload});
export const setHeaderRef = (payload) => ({type: SET_HEADER_REF, payload});