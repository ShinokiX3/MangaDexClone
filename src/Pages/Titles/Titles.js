import { memo, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchFilterTags,
	setMangaIds,
	setOrderType,
	setToInitial,
} from '../../Store/Slices/titlesSlice';
import styles from './titles.module.scss';

import MainContainer from '../../Layouts/MainContainer/MainContainer';
import PageArrowLink from '../../SharedUI/PagesLinks/PageArrowLink';
import FilterTitles from './FilterTitles/FilterTitles';

import { findOutUniqGroups } from '../../Utils/groupElemsBy';
import { compose } from '../../Utils/compose';
import { sortByTagsLength } from './Utils/SortByLength';
import { sortTagsByAlphabet } from './Utils/SortByAlphabet';

import Cards from '../../Features/Cards/Cards';
import Select from '../../SharedUI/StyledComponents/Select/Select';
import Spinner from '../../SharedUI/LoadComponents/Spiner/Spinner';
import useFetchByFilters from './Hooks/useFetchByFilters';

import fetchTitleVariable from './Utils/fetchTitleVariable';
import setTitle from './Utils/setTitle';
import { Helmet } from 'react-helmet';

const Titles = memo(({ hasFilter = true, customTitle = '', handleManga }) => {
	const params = useParams();
	const [groupedTags, setGroupedTags] = useState([]);
	const [selected, setSelected] = useState({
		name: 'Best Match',
		val: 'relevance.desc',
	});

	const dispatch = useDispatch();

	const filterTags = useSelector((state) => state.title.filterTags);
	const filteredManga = useSelector((state) => state.title.filteredData);
	const order = useSelector((state) => state.title.order.data);
	const titleIds = useSelector((state) => state.title.ids);

	const fetchByFilters = useFetchByFilters();

	const title = params['*'];
	const pageTitle = useMemo(() => setTitle(title), [title]);

	const sortValues = useMemo(
		() => [
			{ name: 'Best Match', val: 'relevance.desc' },
			{ name: 'Latest Upload', val: 'latestUploadedChapter.desc' },
			{ name: 'Oldest Upload', val: 'latestUploadedChapter.asc' },
			{ name: 'Title Ascending', val: 'title.asc' },
			{ name: 'Title Descending', val: 'title.desc' },
			{ name: 'Highest Rating', val: 'rating.desc' },
			{ name: 'Lowest Rating', val: 'rating.asc' },
			{ name: 'Most Follows', val: 'followedCount.desc' },
			{ name: 'Fewest Follows', val: 'followedCount.asc' },
			{ name: 'Recently Added', val: 'createdAt.desc' },
			{ name: 'Oldest Added', val: 'createdAt.asc' },
			{ name: 'Year Ascending', val: 'year.asc' },
			{ name: 'Year Descending', val: 'year.desc' },
		],
		[]
	);

	useEffect(() => {
		(async () => {
			const data = await fetchTitleVariable(params['*']);
			dispatch(setMangaIds(data.data.map((item) => item?.id) ?? []));
		})();

		return () => {
			dispatch(setToInitial());
		};
	}, [title]);

	useEffect(() => {
		if (titleIds.load.status === 'resolved') {
			dispatch(fetchFilterTags());
		}
	}, [titleIds.load.status]);

	useEffect(() => {
		if (filterTags.load.status === 'resolved') {
			compose(
				setGroupedTags,
				sortTagsByAlphabet,
				sortByTagsLength,
				findOutUniqGroups
			)(filterTags.data);
			fetchByFilters();
		}
	}, [filterTags.load.status]);

	useEffect(() => {
		dispatch(setOrderType(selected.val));
	}, [selected]);

	useEffect(() => {
		if (filteredManga.load.status === 'resolved') {
			fetchByFilters();
		}
	}, [order]);

	// TODO: paint some tags in different colors

	return (
		<MainContainer
			mainClasses={styles.wrapp}
			containerClasses={styles.container}
			isHeaderBlack
		>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Manga | Searching</title>
				<meta name="description" content={`MangaDex manga searching}`} />
			</Helmet>
			<PageArrowLink
				title={customTitle ? customTitle : pageTitle}
				link=""
				arrowReDirection
			/>
			{pageTitle === 'Advanced Search' ? (
				<FilterTitles
					tags={groupedTags}
					selected={selected}
					hasFilter={hasFilter}
				/>
			) : null}
			<ComponentByStatus
				filteredManga={filteredManga}
				sortValues={sortValues}
				selected={selected}
				setSelected={setSelected}
				handleManga={handleManga}
			/>
		</MainContainer>
	);
});

const ComponentByStatus = memo(
	({ filteredManga, sortValues, selected, setSelected, handleManga }) => {
		switch (filteredManga.load.status) {
			case 'loading':
				return (
					<Spinner
						customStyle={{ width: '35px', height: '35px', marginTop: '15px' }}
					/>
				);
			case 'resolved':
				return (
					<Cards mangasArr={filteredManga.data} handleManga={handleManga}>
						<Select
							values={sortValues}
							selected={selected}
							setSelected={setSelected}
							selectTitle="Sort By"
						/>
					</Cards>
				);
			case 'error':
				return <div>Error...</div>;
			default:
				return <></>;
		}
	}
);

export default Titles;
