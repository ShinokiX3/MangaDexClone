import { useDispatch, useSelector } from 'react-redux';
import { setToInitial } from '../Store/Slices/userSlice';
import MangaDexApi from '../Services/MangaDexApi';

const useLogout = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const logout = async (callback = () => {}) => {
        const resp = await fetch(`${MangaDexApi.CorsProxy}https://api.mangadex.org/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.sessionToken}`
            }
        }).then(data => data.json());

        if (resp.result === 'ok') {
            localStorage.removeItem('user');
            dispatch(setToInitial());
            callback();
        }
    }

    return (callback) => logout(callback);
};

export default useLogout;