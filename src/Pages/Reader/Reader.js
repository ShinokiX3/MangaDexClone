import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './reader-page.scss';

import MangaDexApi from '../../Services/MangaDexApi';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setReaderStatus } from '../../Store/Slices/menuSlice';

import SideMenu from '../../Features/SideMenu/SideMenu';
import SideReader from './SideReader/SideReader';
import Spinner from '../../SharedUI/LoadComponents/Spiner/Spinner';

const Read = () => {
    const params = useParams();
    const isInitialMount = useRef(true);
    const mangaId = params['*'];

    const clientHeight = document.documentElement.clientHeight - 20;
    const clientWidth = document.documentElement.clientWidth;

    const [mangaVolumes, setMangaVolumes] = useState([]);
    const [mangaTitle, setMangaTitle] = useState('');
    const [chapterTitle, setChapterTitle] = useState('');
    const [currentChapter, setCurrentChapter] = useState({
        volume: 1,
        chapter: 1,
        counter: 1,
        currImg: 1,
        maxImg: 1
    });
    const [images, setImages] = useState([]);

    // SideReader

    const dispatch = useDispatch();
    const menu = useSelector(store => store.menu.readerMenu);

    useEffect(() => {
        (async () => {
            const mangaName = await MangaDexApi.getMangaInfo(mangaId).then(data => data.json());
            setMangaTitle(mangaName?.data?.attributes?.title?.en);
        })()
    }, [])

    // const [menuStatus, setMenuStatus] = useSideMenu('chapter');

    const fetchChapterHash = async (volume, chapter, counter) => {
        const chaptersNames = Object.keys(mangaVolumes[volume]?.chapters);
        const currChapter = +chaptersNames[+counter];

        const chaptersIds = [...mangaVolumes[volume]?.chapters[currChapter]?.others, 
            mangaVolumes[volume]?.chapters[currChapter]?.id];

        // const chaptersIds = [...mangaVolumes[volume]?.chapters[chapter]?.others, 
        //     mangaVolumes[volume]?.chapters[chapter]?.id];

        const chaterInfoArr = await MangaDexApi.getInfoAboutChapter(chaptersIds);

        const findChapterByLang = (chapters, lang) => {
            for (let i = 0; i < lang.length; i++) {
                const chapterId = chapters.findIndex(el => el?.data?.attributes?.translatedLanguage === lang[i]);
                if (chapterId !== -1) {
                    return chapterId;
                }
            }
        }

        let chapterLangId = findChapterByLang(chaterInfoArr, ['en', 'uk', 'ru']);

        const chapterId = chapterLangId === chaptersIds.length - 1 ? chaptersIds[chaptersIds.length-1] 
            : chaptersIds[chapterLangId];

        const chapterHash = await MangaDexApi.getChapterHash(chapterId);
        const chapterName = await MangaDexApi.getInfoAboutChapter([chapterId]);

        setChapterTitle(chapterName[0]?.data?.attributes?.title);
        
        const images = chapterHash?.chapter?.data?.map(el => ( 
            `${chapterHash?.baseUrl}/data/${chapterHash?.chapter?.hash}/${el}`
        ));

        setImages(images);
        // setCurrentChapter({
        //     ...currentChapter,
        //     currImg: 1,
        //     maxImg: images?.length || 1
        // });

        setCurrentChapter({
            ...currentChapter,
            currImg: 1,
            maxImg: images?.length || 1
        });
    }

    useEffect(() => {
        const header = document.querySelector('.header-block');
        if (menu.status) {
            header.style.position = "sticky";
            // header.style.backgroundColor = "white";
        } else {
            header.style.position = "relative";
        }
        return () => {
            header.style.position = "sticky";
        }
    }, [menu])

    useEffect(() => {
        const fetchVolumes = async () => {
            const volumes = await MangaDexApi.getMangaChapters(mangaId);
            if (!volumes?.volumes || Object.keys(volumes?.volumes).length === 0) {
                const someOtherIds = (await MangaDexApi.getMangaInfo(mangaId))?.data?.relationships;
                const newMangaId = someOtherIds[someOtherIds?.findIndex(el => el?.related === 'colored')]?.id;
                const volumes = await MangaDexApi.getMangaChapters(newMangaId);
                setMangaVolumes(volumes?.volumes);
            } else {
                setMangaVolumes(volumes?.volumes);
            }
        }
        fetchVolumes();
    }, [])

    // Проверить на работоспособность. Вызывать только если предыдущий стейт изменился. Для отрисовки.
    // Только Апдейт, не должно срабатывать при первой загрузке.

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            fetchChapterHash(currentChapter.volume, currentChapter.chapter, currentChapter.counter);
        }
    }, [currentChapter.volume, currentChapter.chapter, mangaVolumes])

    const mangaContentDelegate = (e) => {
        const leftBorder = clientWidth / 2.3;
        const rightBorder = clientWidth / 2 + (clientWidth / 2 - leftBorder);
        if (e.pageX > leftBorder &&
            e.pageX < rightBorder) {
        } else if (e.pageX > rightBorder) {
            handleNextImg();
        } else {
            handlePrevImg();
        }
    }

    const handleNextImg = () => {
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
        if (currentChapter.currImg === currentChapter.maxImg &&
            currentChapter.counter + 1 <= Object.keys(mangaVolumes[currentChapter.volume]?.chapters).length - 1) {
            setCurrentChapter({
                ...currentChapter,
                chapter: currentChapter.chapter + 1,
                counter: currentChapter.counter + 1,
                currImg: 1,
                maxImg: 1
            })
            setImages([]);
        } else if (currentChapter.currImg === currentChapter.maxImg &&
                    currentChapter.counter + 1 > Object.keys(mangaVolumes[currentChapter.volume]?.chapters).length - 1) {
            setCurrentChapter({
                volume: currentChapter.volume + 1,
                chapter: currentChapter.chapter + 1,
                counter: 1,
                currImg: 1,
                maxImg: 1
            })
            setImages([]);
        } else {
            setCurrentChapter({
                ...currentChapter,
                currImg: currentChapter.currImg + 1
            });
        }
    }

    const handlePrevImg = () => {
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
        if (currentChapter.currImg === 1 &&
             currentChapter.volume === 1 &&
             currentChapter.chapter === 1) {
            setCurrentChapter({
                ...currentChapter,
                chapter: Object.keys(mangaVolumes[currentChapter.volume]?.chapters).length - 1,
                counter: Object.keys(mangaVolumes[currentChapter.volume]?.chapters).length - 1,
                currImg: 1,
                maxImg: 1
            })
            setImages([]);
        } else if (currentChapter.currImg === 1 &&
            currentChapter.volume !== 1 &&
            currentChapter.counter - 1 === 0) {
            setCurrentChapter({
                ...currentChapter,
                volume: currentChapter.volume - 1,
                chapter: currentChapter.chapter - 1,
                counter: Object.keys(mangaVolumes[currentChapter.volume - 1]?.chapters).length - 1,
                currImg: 1,
                maxImg: 1
            })
            setImages([]);
        } else if (currentChapter.currImg === 1 &&
                    currentChapter.counter !== 1) {
            setCurrentChapter({
                ...currentChapter,
                chapter: currentChapter.chapter - 1,
                counter: currentChapter.counter - 1,
                currImg: 1,
                maxImg: 1
            })
            setImages([]);
        } else {
            setCurrentChapter({
                ...currentChapter,
                currImg: currentChapter.currImg - 1
            });
        }
    }

    const handleMenu = () => {
        dispatch(setReaderStatus(!menu.status));
    }

    const handleChapter = (volume, chapter, counter) => {
        setCurrentChapter({
            volume: +volume,
            chapter: +chapter,
            counter: +counter,
            currImg: 1,
            maxImg: 1
        })
        setImages([]);
    }

    const handleImage = (image) => {
        setCurrentChapter({
            ...currentChapter,
            currImg: image
        })
    }

    return (
        <main className="chapter-page">
            <div className="chapter-title">
                <div className="chapter-description">
                    <p className="chapter-name">{chapterTitle}</p>
                    <p className="manga-name">{mangaTitle}</p>
                </div>
                <div className="read-progress-info">
                    <div className='c-vol'>{`Vol. ${currentChapter?.volume}
                        Ch. ${currentChapter.chapter}`}</div>
                    <div className='c-pg'>{`Pg. ${currentChapter.currImg}/${currentChapter.maxImg}`}</div>
                    <div className='c-menu' onClick={handleMenu}>Menu</div>
                </div>
                <p className="translator">Some guy's scans</p>
            </div>
            <div className="chapter-content" style={{maxHeight: clientHeight}} onClick={mangaContentDelegate}>
                {
                    images && images.length > 0 
                    ? images?.map((el, idx) => {
                        if (idx+1 === currentChapter.currImg) {
                            return <img referrerPolicy="no-referrer" src={el} style={{display: '', maxHeight: clientHeight, maxWidth: clientWidth - 40}} 
                                key={el} alt={`img-${idx}`} />
                        } else {
                            return <img referrerPolicy="no-referrer" src={el} style={{display: 'none', maxHeight: clientHeight, maxWidth: clientWidth - 40}} 
                                key={el} alt={`img-${idx}`} />
                        }
                    })
                    :
                    <div style={{height: '55vh'}}>
                        <Spinner customStyle={{width: '47px', height: '47px', borderColor: 'red'}} />
                    </div>
                }
            </div>
            <SideMenu options={{menuType: 'reader'}}>
                <SideReader data={mangaVolumes} handleChapter={handleChapter} currImg={currentChapter.currImg} maxImg={currentChapter.maxImg} handleImage={handleImage} />
            </SideMenu>
        </main>
    );
};

export default Read;