import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import Modal from '../../../Features/Modal/Modal';
import MangaDexApi from '../../../Services/MangaDexApi';
import NewListModal from '../NewListModal/NewListModal';
import styles from './mdlist.module.scss';

const modalRoot = document.getElementById('modal-root');

const MdListModal = ({ active, setActive, mangaId }) => {
	const user = useSelector((state) => state.user.user);

	const [shouldShow, setShouldShow] = useState(false);
	const [selectedLists, setSelectedLists] = useState([]);
	const [list, setList] = useState([]);

	const mdRef = useRef();

	useEffect(() => {
		(async () => {
			const resp = await fetch(
				`${MangaDexApi.CorsProxy}https://api.mangadex.org/user/list?offset=0&limit=100`,
				{
					headers: {
						Authorization: `Bearer ${user.sessionToken}`,
					},
				}
			).then((data) => data.json());
			if (resp.result === 'ok') {
				setList(resp.data);
			}
		})();
	}, []);

	useEffect(() => {
		handleNewList();
	}, [shouldShow]);

	const handleNewList = () => {
		if (shouldShow === true) {
			mdRef.current.style.display = 'none';
			setShouldShow(true);
		} else {
			mdRef.current.style.display = '';
		}
	};

	const handleSave = async () => {
		const response = await MangaDexApi.addToMDLists(
			mangaId,
			selectedLists,
			user.sessionToken
		);
		if (response) setActive(false);
	};

	return (
		<>
			<p className={styles.title}>Add to List</p>
			<div ref={mdRef} className={styles.content}>
				<div className={styles.list}>
					{list.map((item, idx) => (
						<ListItem
							key={item.attributes.name + idx}
							item={item}
							handler={(listId) => {
								if (selectedLists.some((list) => list === listId))
									setSelectedLists(
										selectedLists.filter((list) => list !== listId)
									);
								else setSelectedLists([...selectedLists, listId]);
							}}
						/>
					))}
				</div>
				<button
					onClick={() => setShouldShow(true)}
					className={styles.newlistbutton}
				>
					<p className={styles.addlist}>+</p> Create new list
				</button>
				<div className={styles.controls}>
					<button
						onClick={() => setActive(false)}
						className={styles.cancelbutton}
					>
						Cancel
					</button>
					<button className={styles.addbutton} onClick={handleSave}>
						Save
					</button>
				</div>
			</div>

			{shouldShow
				? ReactDOM.createPortal(
						<Modal
							active={shouldShow}
							setActive={setShouldShow}
							styleModal={{
								backgroundColor: 'initial',
								backdropFilter: 'initial',
							}}
						>
							<NewListModal
								active={shouldShow}
								setActive={setShouldShow}
								setPrevousActive={handleNewList}
							/>
						</Modal>,
						modalRoot
				  )
				: null}
		</>
	);
};

const ListItem = ({ item, handler = () => {} }) => {
	return (
		<>
			<label
				className={styles.label}
				htmlFor={`list-item${item.attributes.name}`}
				onClick={() => handler(item.id)}
			>
				<input type="checkbox" id={`list-item${item.attributes.name}`} />
				<span
					className={`${styles.checkbox} ${
						item.attributes.visibility === 'private' ? styles.private : ''
					}`}
				>
					{item.attributes.name}
				</span>
			</label>
		</>
	);
};

export default MdListModal;
