import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import LinkList from '../../SharedUI/Form/LinkList';
import Logo from '../../SharedUI/Logo/Logo';

import { setMainStatus } from '../../Store/Slices/menuSlice';

import { faHouseUser, faBookmark, faBookOpen, faUserGroup, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import MangaDexApi from '../../Services/MangaDexApi';

const SideMain = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const handleMenu = () => {
        dispatch(setMainStatus(false));
    }

    const handleRandom = async(e) => {
        e.preventDefault();
        const randomManga = await MangaDexApi.getRandomManga();
        navigate(`/manga/${randomManga.data.id}`);
    }

    const handleLinkClick = (e) => {
        const target = e.target;
        if (target.classList.contains('link')) {
            const elems = document.querySelectorAll('.link');
            elems.forEach(elem => {
                elem.classList.remove('active-link');
            });
            target.classList.add('active-link');
        }
    }

    return (
        <div onClick={handleLinkClick}>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '15px', minWidth: '250px', justifyContent: 'center'}}>
                <Logo handleMenu={handleMenu} ico={{side: 'right', type: 'close'}} />
            </div>
            <LinkList ico={faHouseUser} title={"Home"}></LinkList>
            <LinkList ico={faBookmark} title={"Follows"}>
                {/* <Link className="link" to="/singin">Updates</Link> */}
                <Link className="link" to={user.sessionToken ? '/follows' : '/singin'}>Library</Link>
                <Link className="link" to={user.sessionToken ? '/lists' : '/singin'}>MDLists</Link>
                {/* <Link className="link" to="/singin">Followed Groups</Link> */}
                {/* <Link className="link" to="/singin">Reading History</Link> */}
            </LinkList>
            <LinkList ico={faBookOpen} title={"Titles"}>
                <Link className="link" to="/titles">Advanced Search</Link>
                <Link className="link" to="/titles/recently">Recently Added</Link>
                {/* <Link className="link" to="/titles/latest">Latest Updates</Link> */}
                <a className="link" href='/' onClick={handleRandom}>Random</a>
            </LinkList>
            <LinkList ico={faUserGroup} title={"Community"}>
                <Link className="link" to="">Groups</Link>
                <Link className="link" to="">Users</Link>
            </LinkList>
            <LinkList ico={faThumbTack} title={"MangaLive"}>
                <Link className="link" to="">About us</Link>
                <Link className="link" to="">Site Rules</Link>
                <Link className="link" to="">Announcements</Link>
                <Link className="link" to="">Merch Store</Link>
            </LinkList>
        </div>
    );
};

export default SideMain;