import React, { useEffect, useState } from 'react';
import styles from './chapters.module.scss';
import Chapters from './Chapters';

const Volume = ({ volume }) => {
    const [title, setTitle] = useState('');
    const [interval, setInterval] = useState([0, 0]);
    useEffect(() => {
        if (volume) {
            const title = Object.keys(volume)[0];
            setTitle(title);
            setInterval([
                Math.floor(volume[title][0]?.attributes?.chapter),
                Math.floor(volume[title][volume[title].length-1]?.attributes?.chapter)
            ])
        }
    }, [volume])

    return (
        <div className={styles.volume_item}>
            <div className={styles.volume_title}>
                <p>{title}</p>
                <p>{`Ch. ${interval[0]} - ${interval[1]}`}</p>
                <p>{volume[title]?.length}</p>
            </div>
            <Chapters volume={volume[title]} />
        </div>
    );
};

export default Volume;