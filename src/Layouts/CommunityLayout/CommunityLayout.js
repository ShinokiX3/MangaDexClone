import React from 'react';
import Tabs from '../../Features/Tabs/Tabs';
import MainContainer from '../MainContainer/MainContainer';
import ButtonsBlock from './ButtonsBlock';
import styles from './commlay.module.scss';
import avatar from '../../Assets/Images/avatar.png';

const CommunityLayout = ({ handleTabs, title, tabs, children, bgStyles, bgClasses }) => {
    return (
        <MainContainer mainClasses={styles.userpagewrapp} containerClasses={styles.userpagecontainer}>
            <div style={{zIndex: -1, position: 'absolute', ...bgStyles}} className={`banner-image ${bgClasses}`}></div>
            <div className={styles.content}>
                <div className={styles.userimage}>
                    <img src={avatar} alt="" />
                </div>
                {/* <div className={styles.userinfo}> */}
                <div className={styles.userintro}>
                    <div className={styles.title}>{title}</div>
                    <Tabs handleTabs={handleTabs} tabs={tabs} />
                </div>
                {
                    children
                }
                <ButtonsBlock  />
            </div>
        </MainContainer>
    );
};

export default CommunityLayout;