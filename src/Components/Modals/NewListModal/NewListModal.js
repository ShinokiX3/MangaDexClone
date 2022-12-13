import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MangaDexApi from '../../../Services/MangaDexApi';
import Input from '../../../SharedUI/Form/Input';
import styles from '../MdList/mdlist.module.scss';

const NewListModal = ({ active, setActive }) => {
    const user = useSelector(state => state.user.user);

    const [value, setValue] = useState('');
    const [checkboxValue, setCheckboxValue] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async() => {
        setLoading(true);

        const resp = await fetch(`${MangaDexApi.CorsProxy}https://api.mangadex.org/list`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.sessionToken}`
            },
            body: JSON.stringify({name: value, visibility: checkboxValue ? 'private' : 'public', manga: []})
        }).then(data => data.json())

        if (resp.result === 'ok') {
            setActive(false);
        } else {
            // Throw some error here...
            setActive(false);
        }
    }

    return (
        <>
        <p className={styles.title}>Create New List</p>
        <div className={styles.content}>
            <Input type="text" id={styles.mdinput} placeholder="List Name" value={value} setValue={setValue} />
            <label style={{ marginTop: 10 }} className={styles.label} htmlFor="list-item">
                <input type="checkbox" id="list-item" checked={checkboxValue} onChange={(e) => setCheckboxValue(e.target.checked)} />
                <span className={styles.labeltitle}>Private list</span>
            </label>
            <div className={styles.controls}>
                <button onClick={() => setActive(false)} className={styles.cancelbutton}>Cancel</button>
                <button onClick={handleSubmit} className={styles.addbutton}>Save</button>
            </div>
        </div>
        </>
    );
};

export default NewListModal;