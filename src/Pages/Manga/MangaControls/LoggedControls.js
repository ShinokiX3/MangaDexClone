import React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux';
import { BookIcon, ReportIcon, ShareIcon, FollowsIcon } from '../../../Assets/Svg/Manga';
import { DotsIcon } from '../../../Assets/Svg/Pagination';
import ToLibraryModal from '../../../Components/Modals/ToLibraryModal/ToLibraryModal';
import Modal from '../../../Features/Modal/Modal';
import useCheckForAuth from '../../../Hooks/checkForAuth';
import Spinner from '../../../SharedUI/LoadComponents/Spiner/Spinner';
import { refreshToken } from '../../../Store/Slices/userSlice';
import { strToUpper } from '../../../Utils/stringToUpperCase';

const modalRoot = document.getElementById('modal-root');

const LoggedControls = ({ redirectToReader }) => {
    const [shouldOpen, setShouldOpen] = useState(false);
    const [readingStatus, setReadingStatus] = useState('Add To Library');
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const mangaInfo = useSelector(state => state.manga.mangaInfo);
    const user = useSelector(state => state.user.user);

    const authCheck = useCheckForAuth();

    useEffect(() => {
        if (user.username && mangaInfo?.data?.id) {
            fetchMangaStatus(1);
        }
    }, [user, mangaInfo]);

    const fetchMangaStatus = async (count) => {
        const authStatus = await authCheck(); 
        
        if (authStatus === false) { setLoading(false); return false };

        const resp = await fetch(`https://infinite-sea-32007.herokuapp.com/https://api.mangadex.org/manga/${mangaInfo.data.id}/status`, {
            headers: {
                'Authorization': `Bearer ${user.sessionToken}`
            }
        }).then(data => data.json());

        if (resp.result === 'ok') {
            setReadingStatus(strToUpper(resp.status ? resp.status : 'Add To Library'));
            setLoading(false);
        } else if (count !== 2) {
            // dispatch(refreshToken());
            fetchMangaStatus(2);
        } else {
            setLoading(false);
        }
    }

    const handleToLibrary = () => {
        setShouldOpen(true);
    }

    return (
        <>
        <button onClick={handleToLibrary} className={"add-button"}>
            {readingStatus !== 'Add To Library'
                ? <svg className="read-status-ico" data-v-20f285ec="" data-v-022ca1a5="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path data-v-20f285ec="" d="M20 6 9 17l-5-5"></path></svg>
                : <FollowsIcon /> 
            }
            {loading ? <Spinner customStyle={{width: '27px', height: '27px', borderColor: 'white'}} /> : <p>{readingStatus}</p>}
        </button>
        <button className="report-button">
            <svg data-v-20f285ec="" data-v-022ca1a5="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star text-currentColor icon"><path data-v-20f285ec="" d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
        </button>
        <button className="read-button add-to-md-list">
            <svg className="read-status-ico" data-v-20f285ec="" data-v-022ca1a5="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-20f285ec="" d="M8 6h13M8 12h13M8 18h3m10 0h-6m3 3v-6M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            <p>Add To MDList</p>
        </button>
        <button className="read-button" onClick={redirectToReader}>
            {loading 
                ? <div className="butt-with-ico"><Spinner customStyle={{width: '27px', height: '27px', borderColor: 'black'}} /></div>
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