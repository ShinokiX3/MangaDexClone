import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './usermodal.module.scss';

import avatar from '../../../Assets/Images/avatar.png';

import { faGear, faDroplet, faArrowRightToBracket, faBookmark, faUserGroup, faFlag, faListUl, faUser } from '@fortawesome/free-solid-svg-icons';

import { strToUpper } from '../../../Utils/stringToUpperCase';
import IcoButton from '../../../SharedUI/StyledComponents/IcoButton/IcoButton';
import useLogout from '../../../Hooks/logout';
import MangaDexApi from '../../../Services/MangaDexApi';

const links = [
    {title: 'My Profile', icon: faUser, url: `/user/me`},
    {title: 'My Follows', icon: faBookmark, url: '/follows'},
    {title: 'My Lists', icon: faListUl, url: '/lists'},
    {title: 'My Groups', icon: faUserGroup, url: ''},
    {title: 'My Reports', icon: faFlag, url: ''}
]

const UserModal = ({ active, setActive }) => {
    const navigate = useNavigate();

    const user = useSelector(state => state.user.user);
    const logout = useLogout();

    const handleUserProfile = async () => {
        const resp = await fetch(`${MangaDexApi.CorsProxy}https://api.mangadex.org/user/me?includes[]=scanlation_group`, {
            headers: {
                'Authorization': user.sessionToken
            },
        }).then(data => data.json());

        if (resp.result === 'ok') {
            const userId = resp.data.id;
            navigate(`/user/${userId}`);
        }
    }

    return (
        <div className="login-modal">
            <div onClick={handleUserProfile} className={styles.info}>
                <img src={avatar} alt="avatar" />
                <p className={styles.name}>{strToUpper(user.username)}</p>
                <p className={styles.role}>User</p>
            </div>
            <hr className={styles.hr} />
            <div className={styles.links}>
                {links.map(({title, icon, url}) => <IcoButton key={title} title={title} icon={icon} url={url} />)}
            </div>
            <hr className={styles.hr} />
            <div className={styles.settings}>
                <div style={{display: 'flex'}}>
                    <IcoButton title={'Settings'} icon={faGear} />
                    <IcoButton title={'Theme'} icon={faDroplet} />
                </div>
                <IcoButton handler={() => { logout(navigate('/singin')); setActive(false); }} title={'Sign Out'} 
                    icon={faArrowRightToBracket} customStyles={{padding: '10px 13px'}} />
            </div>
        </div>
    );
};

export default UserModal;