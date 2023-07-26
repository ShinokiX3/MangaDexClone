import React from 'react';
import styles from './library.module.scss';

import MainContainer from '../../Layouts/MainContainer/MainContainer';
import PageArrowLink from '../../SharedUI/PagesLinks/PageArrowLink';
import LibraryContent from './LibraryContent';
import { Helmet } from 'react-helmet';

const Library = () => {
	return (
		<MainContainer
			mainClasses={styles.wrapp}
			containerClasses={styles.container}
			isHeaderBlack
		>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Library</title>
				<meta name="description" content={`User library`} />
			</Helmet>
			<PageArrowLink title={'Library'} link="/" arrowReDirection />
			<LibraryContent />
		</MainContainer>
	);
};

export default Library;
