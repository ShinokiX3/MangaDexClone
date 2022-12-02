import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Store/Slices/userSlice';
import useLogout from './logout';

const useCheckForAuth = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const logout = useLogout();

    const refreshToken = async () => {
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

            localStorage.setItem('user', JSON.stringify(refreshedUser));
            dispatch(setUser(refreshedUser));
            return resp.token.session;
        } else {
            console.log(false);
            return false;
        }
    }

    const check = async (newToken = null) => {
        const resp = await fetch(`https://api.mangadex.org/auth/check`, {
            headers: {
                'Authorization': `Bearer ${newToken ? newToken : user.sessionToken}`,
                'Access-Control-Allow-Origin': '*'
            }
        }).then(data => data.json());

        if (resp.result === 'ok' && resp.isAuthenticated === true) {
            return true;
        } else if (resp.result === 'ok' && resp.isAuthenticated === false && !!newToken) {
            const resp = await refreshToken();
            if (resp) {
                check(resp);
            } else return false;
        } else {
            logout();
            return false;
        }
    }

    return check;
};

export default useCheckForAuth;