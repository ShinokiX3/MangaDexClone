import React from 'react';
import { strToUpper } from '../../Utils/stringToUpperCase';

const MangaStatus = ({ status, additionalInfo = null, styles = { textStyles: {}, blockStyles: {} } }) => {
    const colorage = (status) => {
        const colorage = {
            'ongoing': '#04D000',
            'completed': '#00C9F5',
            'hiatus': '#f79421'
        }
        return colorage[status] || colorage['default'];
    }

    return (
        <div className="manga-status-block" style={styles.blockStyles}>
            <span className="manga-status-span" style={{backgroundColor: colorage(status)}}></span>
            <p style={styles.textStyles}>{additionalInfo}</p>
            <p style={styles.textStyles}>{strToUpper(status)}</p>
        </div>
    );
};

export default MangaStatus;