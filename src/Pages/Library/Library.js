import React from 'react';
import styles from './library.module.scss';

import MainContainer from '../../Layouts/MainContainer/MainContainer';
import PageArrowLink from '../../SharedUI/PagesLinks/PageArrowLink';
import LibraryContent from './LibraryContent';

const Library = () => {
    return (
        <MainContainer mainClasses={styles.wrapp} containerClasses={styles.container} isHeaderBlack >
            <PageArrowLink title={'Library'} link='/' arrowReDirection />
            <LibraryContent />
        </MainContainer>
    );
};

export default Library;