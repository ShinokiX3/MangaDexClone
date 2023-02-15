import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import MainContainer from '../../Layouts/MainContainer/MainContainer';
import PageArrowLink from '../../SharedUI/PagesLinks/PageArrowLink';

import Input from '../../SharedUI/Form/Input';
import Select from '../../SharedUI/StyledComponents/Select/Select';

import styles from './cratelist.module.scss';
import ActiveButton from '../../SharedUI/StyledComponents/ActiveButton/ActiveButton';
import PassiveButton from '../../SharedUI/StyledComponents/PassiveButton/CancelButton';
import Modal from '../../Features/Modal/Modal';
import Titles from '../Titles/Titles';
import Img from '../../SharedUI/StyledComponents/Img/Img';
import { filterSomeAttribute } from '../../Utils/filterAttribute';
import { useNavigate } from 'react-router-dom';
import MangaDexApi from '../../Services/MangaDexApi';
import { useSelector } from 'react-redux';

const modalRoot = document.getElementById('modal-root');

const CreateList = () => {
    return (
        <MainContainer mainClasses={styles.wrapp} containerClasses={styles.container} isHeaderBlack>
            <PageArrowLink title={'Create List'} link='lists' arrowReDirection />
            <CreateListContent />
        </MainContainer>
    );
};

const CreateListContent = () => {
    const [value, setValue] = useState('');
    const [selected, setSelected] = useState('Public');
    const [handledManga, setHandledManga] = useState([]);

    const [shouldShow, setShouldShow] = useState(false);
    
    const navigate = useNavigate();

    const user = useSelector(state => state.user.user);

    const handleManga = (manga) => {
        const fId = handledManga.findIndex(value => value.id === manga.id);
        if (fId !== -1) setHandledManga([...handledManga.slice(0, fId), ...handledManga.slice(fId + 1)])
        else return setHandledManga([...handledManga, manga]);
    }

    const removeManga = (manga) => {
        const fId = handledManga.findIndex(value => value.id === manga.id);
        if (fId !== -1) setHandledManga([...handledManga.slice(0, fId), ...handledManga.slice(fId + 1)]);
    }

    const fetchNewList = async() => {
        const resp = await fetch(`${MangaDexApi.CorsProxy}https://api.mangadex.org/list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.sessionToken}`
            },
            body: JSON.stringify({
                name: value,
                manga: [...handledManga.map(manga => manga.id)],
                visibility: selected.name.toLowerCase()
            })
        }).then(data => data.json())

        if (resp.result === 'ok') alert('Done!');
        else alert('Error!');
    }

    return (
        <>
        <div style={{display: 'flex', gap: '20px'}}>
            <Input type="text" id={styles.mdinput} placeholder="List Name" value={value} setValue={setValue} />
            <Select values={[{name: 'Public'}, {name: 'Private'}]} selected={selected} setSelected={setSelected} selectTitle='Visivility' />
        </div>
        {handledManga.length > 0 
            ? <div className={styles.choose}>
                {handledManga.map(manga => (
                    <div className={styles.mangawrapper}>
                        <Img key={manga.id} src={`https://uploads.mangadex.org/covers/${manga?.id}/${filterSomeAttribute(manga?.relationships, 'cover_art', 'fileName')}`} alt='' 
                            classes={styles.img_wrapp}
                        />  
                        <span onClick={() => removeManga(manga)} className={styles.removemanga}>
                            <svg data-v-58fcffdf="" data-v-1de6ef87="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6 6 18M6 6l12 12"></path></svg>
                        </span>
                    </div>              
                ))}
              </div>
            : null
        }
        <button onClick={() => setShouldShow(true)} className={styles.addmanga}>
            <svg data-v-58fcffdf="" data-v-1de6ef87="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" style={{marginRight: '10px'}} viewBox="0 0 24 24"><path d="M12 5v14m-7-7h14"></path></svg>
            Add Some Manga
        </button>
        <hr style={{height: '0.5px', width: '100%', backgroundColor: 'lightgrey'}} />
        <div className={styles.controlwrapper}>
            <PassiveButton title='Cancel' handle={() => navigate('/lists')} />
            <ActiveButton title='Create List' handle={fetchNewList} />
        </div>

        {shouldShow
            ? ReactDOM.createPortal(
                <Modal active={shouldShow} setActive={() => setShouldShow(false)} styleModalContent={{width: '90%', overflowX: 'hidden'}}>
                    <Titles hasFilter={false} customTitle='Find Manga' handleManga={handleManga} />
                </Modal>
                , modalRoot)
            : null
        }
        </>
    )
}

export default CreateList;