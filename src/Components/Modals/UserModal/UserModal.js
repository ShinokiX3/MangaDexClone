import React from 'react';
import styles from './usermodal.module.scss';

import avatar from '../../../Assets/Images/avatar.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faGear, faDroplet, faArrowRightToBracket, faBookmark, faUserGroup, faFlag, faListUl, faUser } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';
import { strToUpper } from '../../../Utils/stringToUpperCase';
import IcoButton from '../../../SharedUI/StyledComponents/IcoButton/IcoButton';
import { useDispatch } from 'react-redux';
import { setToInitial } from '../../../Store/Slices/userSlice';

const links = [
    {title: 'My Profile', icon: faUser, url: ''},
    {title: 'My Follows', icon: faBookmark, url: ''},
    {title: 'My Lists', icon: faListUl, url: ''},
    {title: 'My Groups', icon: faUserGroup, url: ''},
    {title: 'My Reports', icon: faFlag, url: ''}
]

const UserModal = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const handleSignOut = () => {
        localStorage.removeItem('user');
        dispatch(setToInitial());
    }

    return (
        <div className="login-modal">
            <div className={styles.info}>
                <img src={avatar} alt="avatar" />
                <p className={styles.name}>{strToUpper(user.username)}</p>
                <p className={styles.role}>User</p>
            </div>
            <hr className={styles.hr} />
            <div className={styles.links}>
                {links.map(({title, icon, url}) => <IcoButton title={title} icon={icon} />)}
            </div>
            <hr className={styles.hr} />
            <div className={styles.settings}>
                <div style={{display: 'flex'}}>
                    <IcoButton title={'Settings'} icon={faGear} />
                    <IcoButton title={'Theme'} icon={faDroplet} />
                </div>
                <IcoButton handler={handleSignOut} title={'Sign Out'} icon={faArrowRightToBracket} customStyles={{padding: '10px 13px'}} />
            </div>
        </div>
    );
};

export default UserModal;