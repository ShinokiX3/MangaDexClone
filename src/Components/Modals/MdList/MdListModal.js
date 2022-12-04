import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MangaDexApi from '../../../Services/MangaDexApi';
import styles from './mdlist.module.scss';

const MdListModal = ({ active, setActive }) => {
    const user = useSelector(state => state.user.user);
    const [list, setList] = useState([]);

    useEffect(() => {
        (async () => {
            const resp = await fetch(`${MangaDexApi.CorsProxy}https://api.mangadex.org/user/list?offset=0&limit=100`, {
                headers: {
                    'Authorization': `Bearer ${user.sessionToken}`
                }
            }).then(data => data.json())
            if (resp.result === 'ok') {
                setList(resp.data);
            }
            console.log(resp);
        })()
    }, []);

    return (
        <>
        <p className={styles.title}>Add to List</p>
            <div className={styles.content}>
                <div className={styles.list}>
                    {list.map(item => <ListItem item={item} />)}
                </div>
                <button className={styles.newlistbutton}><p className={styles.addlist}>+</p> Create new list</button>
                <div className={styles.controls}>
                    <button className={styles.cancelbutton}>Cancel</button>
                    <button className={styles.addbutton}>Save</button>
                </div>
            </div>
        </>
    );
};

const ListItem = ({ item }) => {
    return (
        <>
        <label className={styles.label} htmlFor="list-item">
            <input type="checkbox" htmlFor="list-item"/>
            <span className={`${styles.checkbox} ${item.attributes.visibility === 'private' ? styles.private : ''}`}>
                {item.attributes.name}
            </span>
        </label>
        </>
    )
}

export default MdListModal;