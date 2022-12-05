import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux';
import { BookIcon, ReportIcon, ShareIcon, FollowsIcon } from '../../../Assets/Svg/Manga';
import { DotsIcon } from '../../../Assets/Svg/Pagination';
import GradeDetails from '../../../Components/Details/GradeDetails/GradeDetails';
import MdListModal from '../../../Components/Modals/MdList/MdListModal';
import ToLibraryModal from '../../../Components/Modals/ToLibraryModal/ToLibraryModal';
import Details from '../../../Features/Details/Details';
import Modal from '../../../Features/Modal/Modal';
import useCheckForAuth from '../../../Hooks/checkForAuth';
import MangaDexApi from '../../../Services/MangaDexApi';
import Spinner from '../../../SharedUI/LoadComponents/Spiner/Spinner';
import { strToUpper } from '../../../Utils/stringToUpperCase';

const modalRoot = document.getElementById('modal-root');

const grades = [
    {grade: 10, title: 'Masterpiece'},
    {grade: 9, title: 'Great'},
    {grade: 8, title: 'Very Good'},
    {grade: 7, title: 'Good'},
    {grade: 6, title: 'Fine'},
    {grade: 5, title: 'Average'},
    {grade: 4, title: 'Bad'},
    {grade: 3, title: 'Very Bad'},
    {grade: 2, title: 'Horrible'},
    {grade: 1, title: 'Appalling'}
]

const LoggedControls = ({ redirectToReader }) => {
    const [shouldOpen, setShouldOpen] = useState(false);
    const [shouldRankOpen, setShouldRankOpen] = useState(false);
    const [shouldMdlistOpen, setShouldMdlistOpen] = useState(false);
    
    const [readingStatus, setReadingStatus] = useState('Add To Library');
    
    const [gradeStatus, setGradeStatus] = useState('');

    const [loading, setLoading] = useState(true);
    const [gradeLoading, setGradeLoading] = useState(true);

    const mangaInfo = useSelector(state => state.manga.mangaInfo);
    const user = useSelector(state => state.user.user);

    const ref = useRef();

    const authCheck = useCheckForAuth();

    useEffect(() => {
        if (user.username && mangaInfo?.data?.id) {
            fetchMangaStatus(1);
            fetchCurrentGrade();
        }
    }, [user, mangaInfo]);

    const fetchMangaStatus = async (count) => {
        const authStatus = await authCheck(); 
        
        if (authStatus === false) { setLoading(false); return false };

        const resp = await fetch(`${MangaDexApi.CorsProxy}https://api.mangadex.org/manga/${mangaInfo.data.id}/status`, {
            headers: {
                'Authorization': `Bearer ${user.sessionToken}`
            }
        }).then(data => data.json());

        if (resp.result === 'ok') {
            setReadingStatus(strToUpper(resp.status ? resp.status : 'Add To Library'));
            setLoading(false);
        } else if (count !== 2) {
            fetchMangaStatus(2);
        } else {
            setLoading(false);
        }
    }

    const handleToLibrary = () => {
        setShouldOpen(true);
    }

    const handleGrade = async (grade) => {
        setShouldRankOpen(false);
        const authStatus = await authCheck(); 

        if (authStatus && grade) {
            setGradeLoading(true);

            const resp = await fetch(`${MangaDexApi.CorsProxy}https://api.mangadex.org/rating/${mangaInfo?.data?.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.sessionToken}`
                },
                body: JSON.stringify({
                    rating: grade
                })
            }).then(data => data.json());

            if (resp.result === 'ok') {
                setGradeStatus(grade);
                setGradeLoading(false);
            } else {
                setGradeLoading(false);
            }
        }
    }

    const fetchCurrentGrade = async () => {
        const authStatus = await authCheck(); 

        if (authStatus === false) { setGradeLoading(false); return false };

        if (authStatus) {
            setGradeLoading(true);
            const resp = await fetch(`${MangaDexApi.CorsProxy}https://api.mangadex.org/rating?manga[]=${mangaInfo?.data?.id}`, {
                headers: {
                    'Authorization': `Bearer ${user.sessionToken}`
                }
            }).then(data => data.json());

            if (resp.result === 'ok' && resp.ratings[mangaInfo?.data?.id]) {
                const grade = resp.ratings[mangaInfo?.data?.id].rating;
                setGradeStatus(grade);
                setGradeLoading(false);
            } else {
                setGradeStatus('');
                setGradeLoading(false);
            }
        }
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

        <button onClick={() => setShouldRankOpen(!shouldRankOpen)} ref={ref} className={`report-button ${gradeStatus ? 'report-active' : ''}`}>
            { gradeLoading 
                ? <Spinner customStyle={{ width: '27px', height: '27px', borderColor: 'white' }} />
                : <>
                    <svg data-v-20f285ec="" data-v-022ca1a5="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star text-currentColor icon"><path data-v-20f285ec="" d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                    <p>{gradeStatus}</p>
                  </>
            }
        </button>
        
        <button onClick={() => setShouldMdlistOpen(true)} className="read-button add-to-md-list">
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
 
        {shouldRankOpen
            ? ReactDOM.createPortal(
                <Details shouldShow={shouldRankOpen}  setShouldShow={setShouldRankOpen} rootElement={ref}>
                    <GradeDetails grades={grades} handleGrade={handleGrade} />
                </Details>,
                ref.current)
            : null
        }

        {shouldMdlistOpen 
            ? ReactDOM.createPortal(
                <Modal active={shouldMdlistOpen} setActive={setShouldMdlistOpen}>
                    <MdListModal setActive={setShouldMdlistOpen} />
                </Modal>,
                modalRoot)
            : null
        }
        </>
    );
};

export default LoggedControls;