import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToInitial } from '../Store/Slices/userSlice';

const useLogout = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const logout = async (callback = () => {}) => {
        const resp = await fetch(`https://api.mangadex.org/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.sessionToken}`,
                'Access-Control-Allow-Origin': '*'
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