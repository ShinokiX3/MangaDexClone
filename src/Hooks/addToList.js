import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Store/Slices/userSlice';

const useAddToList = (mangaId) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const fetchMangaToList = async (list) => {
        const resp = await fetch(`https://api.mangadex.org/manga/${mangaId}/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.sessionToken}`,
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                status: list.value
            })
        }).then(data => data.json());

        console.log(resp);
    }

    const refreshSession = async (list) => {
        const resp = await fetch('https://api.mangadex.org/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
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

            dispatch(setUser(refreshedUser));
            fetchMangaToList(list)
        }
    }

    return (list) => {
        if (user.username && user.expires > new Date().valueOf()) {
            fetchMangaToList(list);
        } else {
            refreshSession(list);
        }
    }
};

export default useAddToList;