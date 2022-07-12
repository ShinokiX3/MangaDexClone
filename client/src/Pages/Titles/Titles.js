import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './titles.module.scss'

const Titles = () => {
    const params = useParams();
    const titlesId = params['*'];

    console.log(titlesId);

    return (
        <main className={styles.wrapp}>
            <div className={styles.container}>
                Titles
            </div>
        </main>
    );
};

export default Titles;