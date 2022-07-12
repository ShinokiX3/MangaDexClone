import React from 'react';
import styles from '../Keyvalues/keyvalues.module.scss';

import { flags } from '../../../Assets/Svg/Flags';
import { lanScripts } from '../../../Assets/Svg/LangScripts';

const AlternativeTitles = ({ titles = [] }) => {
    return (
        <div className={styles.alt_title_block}>
            <div className={styles.name}>Alternative Titles</div>
            {
                titles.map((item, index) => {
                    const flagName = Object.keys(item)[0].split('-');
                    return (
                        <div key={flagName+index} style={{display: 'flex'}} className={styles.alt_title}>
                            <FlagElem flag={flagName} />    
                            <span>{Object.values(item)[0]}</span>
                        </div>
                    )
                })
            }
        </div>
    );
};

const FlagElem = ({ flag }) => {
    if (flag[1] === 'hk') flag = [flag.join('-')];
    if (flag.length > 1) {
        return (
            <div style={{position: 'relative', height: '100%', display: 'flex', alignItems: 'center'}}>
                <img src={flags[flag[0]]} alt=""/>
                <img src={lanScripts[flag[1]]} alt="" style={{position: 'absolute', bottom: '0', right: '0', width: '12px'}} />
            </div>
        )
    } else {
        return (
            <div>
                <img src={flags[flag[0]]} alt="" />
            </div>
        )
    }
}

export default AlternativeTitles;