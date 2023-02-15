import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import Details from '../../Features/Details/Details';
import Tabs from '../../Features/Tabs/Tabs';
import Spinner from '../../SharedUI/LoadComponents/Spiner/Spinner';
import styles from './mdlists.module.scss';

import userImg from '../../Assets/Images/avatar.png';
import ListDetails from '../../Components/Details/ListDetails/ListDetails';
import MangaDexApi from '../../Services/MangaDexApi';
import Img from '../../SharedUI/StyledComponents/Img/Img';
import { useMemo } from 'react';
import { filterSomeAttribute } from '../../Utils/filterAttribute';
import { useNavigate } from 'react-router-dom';

const MdListsContent = () => {
    const [loading, setLoading] = useState(true);
    const [lists, setLists] = useState([]);
    const [activeTab, setActiveTab] = useState('MyLists');

    const navigate = useNavigate();

    const user = useSelector(state => state.user.user);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const resp = await fetch(`${MangaDexApi.CorsProxy}https://api.mangadex.org/user/list?limit=100`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.sessionToken}`
                }
            }).then(data => data.json())

            if (resp.result === 'ok') {
                setLists(resp.data);
                setLoading(false);
            } else {
                // Throw error or something...
                setLoading(false);
            }
        })()
    }, []);

    const handleTabs = (e) => {
        if (e.target.nodeName === 'SPAN') {
            setActiveTab(e.target.innerText);
            const elems = document.querySelectorAll('.select-tab');
            elems.forEach(el => el.classList.remove('active'));
            e.target.classList.add('active');
        }
    }

    if (loading) return <Spinner customStyle={{width: 32, height: 32, borderColor: 'red'}} />

    return (
        <>
        <Tabs handleTabs={handleTabs} tabs={['My Lists', 'Followed lists']} />
        <div onClick={() => navigate('/create/list')} className={styles.newlist}>+ New List</div>
        {lists.map((list, index) => <List key={list.attributes.name + index} list={list} />)}
        </>
    );
};

const List = ({ list }) => {
    const user = useSelector(state => state.user.user);
    const [shouldShow, setShouldShow] = useState(false);
    const [mangaInfo, setMangaInfo] = useState([]);

    const listref = useRef();
    const navigate = useNavigate();

    const { attributes: {name: title, visibility} } = list;

    const mangaIds = useMemo(() => {
        return list.relationships?.filter(li => li.type === 'manga');
    }, [list])

    useEffect(() => {
        (async () => {
            const resp = await MangaDexApi.getMangaInfoByArray(mangaIds, mangaIds.length).then(data => data.json());
            
            if (resp.result === 'ok') {
                setMangaInfo(resp.data)
            }
        })()
    }, [mangaIds]);

    return (
        <div className={styles.listwraper}>
            <div className={styles.listinfo}>
                <h3>{title}</h3>
                <div className={styles.userinfo}>
                    <img src={userImg} alt="avatar" />
                    <p>{user.username}</p>
                </div>
                <span className={`${visibility === 'private' ? styles.private : ''}`}></span>
                <div className={styles.manga}>{mangaInfo?.map(manga => (
                    <div key={manga.id} onClick={() => navigate(`/manga/${manga?.id}`)} className={styles.mangawrapper}>
                        <Img key={manga.id} src={`https://uploads.mangadex.org/covers/${manga?.id}/${filterSomeAttribute(manga?.relationships, 'cover_art', 'fileName')}`} alt='' 
                            classes={styles.img_wrapp}
                        />
                    </div>
                ))}
                </div>
            </div>
            <div ref={listref} onClick={() => setShouldShow(!shouldShow)} className={styles.listdetails}></div>

            {shouldShow
            ? ReactDOM.createPortal(
                <Details shouldShow={shouldShow} setShouldShow={setShouldShow} rootElement={listref}>
                    <ListDetails>
                        <p>Follow</p>
                        <p>Delete</p>
                        <p>Edit</p>
                    </ListDetails>
                </Details>,
                listref.current)
            : null}
        </div>   
    )
}

export default MdListsContent;