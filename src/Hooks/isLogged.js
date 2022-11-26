import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '../Store/Slices/userSlice';

const checkForAuth = async (dispatch, sessionToken, count = 1) => {
    const resp = await fetch('https://infinite-sea-32007.herokuapp.com/https://api.mangadex.org/auth/check', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    }).then(data => data.json());

    if (resp.result === 'ok' && resp.isAuthenticated === false && count !== 2) {
        dispatch(refreshToken());
        checkForAuth(dispatch, sessionToken, 2)
    } else if (resp.result === 'ok' && resp.isAuthenticated === false && count === 2) {
        return false;
    } else {
        return true;
    }
}

const useIsLogged = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    return () => checkForAuth(dispatch, user.sessionToken);
};

export default useIsLogged;