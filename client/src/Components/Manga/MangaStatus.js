import React from 'react';
import { strToUpper } from '../../Utils/stringToUpperCase';

const MangaStatus = ({ status, additionalInfo = null, styles = { textStyles: {}, blockStyles: {} } }) => {
    const colorage = (status) => {
        const colorage = {
            'ONGOING': '#04D000',
            'COMPLETED': '#00C9F5'
        }
        return colorage[status] || colorage['default'];
    }

// styles.blockStyles

    return (
        <div className="manga-status-block" style={styles.blockStyles}>
            <span className="manga-status-span" style={{color: colorage(status)}}></span>
            <p style={styles.textStyles}>{additionalInfo}</p>
            <p style={styles.textStyles}>{strToUpper(status)}</p>
        </div>
    );
};

export default MangaStatus;