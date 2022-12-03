import React, { useEffect, useState, memo } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import Tabs from '../../Features/Tabs/Tabs';
import Spinner from '../../SharedUI/LoadComponents/Spiner/Spinner';
import Cards from '../../Features/Cards/Cards';

import styles from './library.module.scss';
import Modal from '../../Features/Modal/Modal';
import ErrorModal from '../../Components/Modals/ErrorModal/ErrorModal';
import MangaDexApi from '../../Services/MangaDexApi';

const readingStatusList = {
    'Reading': 'reading',
    'On Hold': 'on_hold',
    'Dropped': 'dropped',
    'Plan to Read': 'plan_to_read',
    'Completed': 'completed',
    'Re-Reading': 're_reading'
}

const tabs = Object.keys(readingStatusList);

const modalRoot = document.getElementById('modal-root');

const collectItems = (items) => {
    const values = Array.from(new Set(Object.values(items)));
    const mangaList = Object.assign(...Array.from(values, value => ({[value]: []})));

    for (let follow in mangaList) {
        for (let key in items) {
            if (items[key] === follow) {
                mangaList[follow].push({id: key});
            }
        }
    }

    return mangaList;
}

const LibraryContent = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [mangaList, setMangaList] = useState({});
    const [currentTab, setCurrentTab] = useState('Reading');
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        (async () => {
            const resp = await fetch(`${MangaDexApi.CorsProxy}https://api.mangadex.org/manga/status`, {
                headers: {
                    'Authorization': `Bearer ${user.sessionToken}`,
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(data => data.json());

            if (resp.result === 'ok') {
                const mangaList = collectItems(resp.statuses);
                setMangaList(mangaList);
            } else {
                setError(resp[0]);
            }

            setLoading(false);
        })()
    }, []);

    const handleTabs = (e) => {
        if (e.target.nodeName === 'SPAN') {
            setCurrentTab(e.target.innerText);
            const elems = document.querySelectorAll('.select-tab');
            elems.forEach(el => el.classList.remove('active'));
            e.target.classList.add('active');
        }
    }

    return (
        <div>
            <Tabs handleTabs={handleTabs} tabs={tabs} />
            <div>
                <LoadFollow mangaList={mangaList[readingStatusList[currentTab]]} loading={loading} error={error} />
            </div>
        </div>
    );
};

const LoadFollow = ({ mangaList = [], loading, error }) => {
    if (error) return (
        ReactDOM.createPortal(
            <Modal active={true}>
                <ErrorModal error={{statusCode: error.status, details: error.detail}} />
            </Modal>
            , modalRoot
        )
    )

    return loading ? <Spinner customStyle={{width: '45px', height: '45px', borderColor: ''}} /> : (
        <Cards mangasArr={mangaList}>
            <p className={styles.titlescount}>{`${mangaList.length || '0'} Titles`}</p>
        </Cards>
    )
}

export default LibraryContent;