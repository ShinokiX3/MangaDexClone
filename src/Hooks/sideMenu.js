import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setMainMenuStatus, setChapterMenuStatus } from '../OldStore/userReducer';

const useSideMenu = (sideMenu) => {
    const [menuStatus, setMenuStatus] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        if (sideMenu === 'main') {
            dispatch(setMainMenuStatus(menuStatus));
        } else if (sideMenu === 'chapter') {
            dispatch(setChapterMenuStatus(menuStatus));
        }
    }, [menuStatus]);

    return [menuStatus, setMenuStatus];
};

export default useSideMenu;