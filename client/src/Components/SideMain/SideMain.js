import React from 'react';
import LinkList from '../../SharedUI/Form/LinkList';
import Logo from '../../SharedUI/Logo/Logo';

import { setMainStatus } from '../../Store/Slices/menuSlice';

import { faHouseUser, faBookmark, faBookOpen, faUserGroup, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

const SideMain = () => {

    const dispatch = useDispatch();
    const menu = useSelector(state => state.menu.mainMenu);

    const handleMenu = () => {
        dispatch(setMainStatus(false));
    }

    return (
        <div >
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px', minWidth: '250px', justifyContent: 'center'}}>
                <Logo handleMenu={handleMenu} ico={{side: 'right', type: 'close'}} />
            </div>
            <LinkList ico={faHouseUser} title={"Home"}></LinkList>
            <LinkList ico={faBookmark} title={"Follows"}>
                <a className="link" href="dsad">Updates</a>
                <a className="link" href="dsad">Library</a>
                <a className="link" href="dsad">Followed Groups</a>
                <a className="link" href="dsad">Reading History</a>
            </LinkList>
            <LinkList ico={faBookOpen} title={"Titles"}>
                <a className="link" href="dsad">Advanced Search</a>
                <a className="link" href="dsad">Recently Added</a>
                <a className="link" href="dsad">Latest Updates</a>
                <a className="link" href="dsad">Random</a>
            </LinkList>
            <LinkList ico={faUserGroup} title={"Community"}>
                <a className="link" href="dsad">Groups</a>
                <a className="link" href="dsad">Users</a>
            </LinkList>
            <LinkList ico={faThumbTack} title={"MangaLive"}>
                <a className="link" href="dsad">About Us</a>
                <a className="link" href="dsad">Site Rules</a>
                <a className="link" href="dsad">Announcements</a>
                <a className="link" href="dsad">Merch Store</a>
            </LinkList>
        </div>
    );
};

export default SideMain;