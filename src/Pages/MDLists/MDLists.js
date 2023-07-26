import React from 'react';
import styles from './mdlists.module.scss';

import MainContainer from '../../Layouts/MainContainer/MainContainer';
import PageArrowLink from '../../SharedUI/PagesLinks/PageArrowLink';
import MdListsContent from './MdListsContent';
import { Helmet } from 'react-helmet';

const MDLists = () => {
	return (
		<MainContainer
			mainClasses={styles.wrapp}
			containerClasses={styles.container}
			isHeaderBlack
		>
			<Helmet>
				<meta charSet="utf-8" />
				<title>MD Lists</title>
				<meta name="description" content={`MangaDex manga mdlists`} />
			</Helmet>
			<PageArrowLink title={'MDLists'} link="" arrowReDirection />
			<MdListsContent />
		</MainContainer>
	);
};

export default MDLists;
