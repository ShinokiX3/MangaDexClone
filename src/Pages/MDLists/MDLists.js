import React from 'react';
import styles from './mdlists.module.scss';

import MainContainer from '../../Layouts/MainContainer/MainContainer';
import PageArrowLink from '../../SharedUI/PagesLinks/PageArrowLink';
import MdListsContent from './MdListsContent';

const MDLists = () => {
    return (
        <MainContainer mainClasses={styles.wrapp} containerClasses={styles.container} isHeaderBlack >
            <PageArrowLink title={'MDLists'} link='' arrowReDirection />
            <MdListsContent />
        </MainContainer>
    );
};

export default MDLists;