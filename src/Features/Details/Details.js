import React from 'react';
import { useEffect } from 'react';
import styles from './details.module.scss';

const Details = ({ setShouldShow, rootElement, children }) => {
    useEffect(() => {
        const handler = (e) => {
            if (!rootElement.current.contains(e.target)) {
                setShouldShow(false);
            }
        }

        document.addEventListener('click', handler);

        return () => {
            document.removeEventListener('click', handler);
        }
    }, []);

    return (
        <div className={styles.wrapper} >
            <div className={styles.content}>
                { children }
            </div>
        </div>
    );
};

export default Details;