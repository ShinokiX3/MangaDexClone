import React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { BookIcon, ReportIcon, ShareIcon } from '../../../Assets/Svg/Manga';
import { FollowsIcon } from '../../../Assets/Svg/Manga';
import { DotsIcon } from '../../../Assets/Svg/Pagination';
import ToLibraryModal from '../../../Components/Modals/ToLibraryModal/ToLibraryModal';
import Modal from '../../../Features/Modal/Modal';
import Spinner from '../../../SharedUI/LoadComponents/Spiner/Spinner';
import { refreshToken } from '../../../Store/Slices/userSlice';
import { filterSomeAttribute } from '../../../Utils/filterAttribute';
import { strToUpper } from '../../../Utils/stringToUpperCase';

const modalRoot = document.getElementById('modal-root');

const LoggedControls = ({ redirectToReader }) => {
    const [shouldOpen, setShouldOpen] = useState(false);
    const [readingStatus, setReadingStatus] = useState('Add To Library');
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const mangaInfo = useSelector(state => state.manga.mangaInfo);
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        if (user.username && mangaInfo?.data?.id) {
            fetchMangaStatus(1);
        }
    }, [mangaInfo]);

    const fetchMangaStatus = async (count) => {
        const resp = await fetch(`https://infinite-sea-32007.herokuapp.com/https://api.mangadex.org/manga/${mangaInfo.data.id}/status`, {
            headers: {
                'Authorization': `Bearer ${user.sessionToken}`
            }
        }).then(data => data.json());

        if (resp.result === 'ok') {
            setReadingStatus(strToUpper(resp.status));
            setLoading(false);
        } else if (count !== 2) {
            dispatch(refreshToken());
            fetchMangaStatus(2);
        }
    }

    const handleToLibrary = () => {
        setShouldOpen(true);
    }

    return (
        <>
        <button onClick={handleToLibrary} className={"add-button"}>
            {readingStatus !== 'Add To Library' 
                ? <svg class="read-status-ico" data-v-20f285ec="" data-v-022ca1a5="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-20f285ec="" d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h9m6.63-4A17.888 17.888 0 0 1 18 8m-4.27 13a2 2 0 0 1-3.46 0M17 18l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg> 
                : <FollowsIcon /> 
            }
            <p>{loading ? <Spinner customStyle={{width: '27px', height: '27px', borderColor: 'white'}} /> : readingStatus}</p>
        </button>
        <button className="report-button">
            <svg data-v-20f285ec="" data-v-022ca1a5="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star text-currentColor icon"><path data-v-20f285ec="" d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
        </button>
        <button className="read-button add-to-md-list">
            <svg class="read-status-ico" data-v-20f285ec="" data-v-022ca1a5="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-20f285ec="" d="M8 6h13M8 12h13M8 18h3m10 0h-6m3 3v-6M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <p>Add To MDList</p>
        </button>
        <button className="read-button" onClick={redirectToReader}>
            {loading 
                ? <p className="butt-with-ico"><Spinner customStyle={{width: '27px', height: '27px', borderColor: 'black'}} /></p>
                : <> 
                  <BookIcon /> 
                  <p className="butt-with-ico">{readingStatus !== 'Add To Library' ? 'Continue Reading' : 'Start Reading'}</p>
                  </>
            }
        </button>
        <button className="report-button">
            <ReportIcon />
        </button>
        <button className="share-button">
            <ShareIcon />
        </button>
        <button className="hide-button">
            <DotsIcon />
        </button>
        
        {shouldOpen 
            ? ReactDOM.createPortal(
                <Modal active={shouldOpen} setActive={setShouldOpen}>
                    <ToLibraryModal setStatus={setReadingStatus} setActive={setShouldOpen} />
                </Modal>,
                modalRoot)
            : null
        }
        
        </>
    );
};

export default LoggedControls;