import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './chapterPage.scss';

import MangaDexApi from '../../Services/MangaDexApi';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setChapterMenuStatus } from '../../Store/userReducer';

import SideMenu from '../../Components/SideMenu/SideMenu';
import SideChapters from '../../Components/SideMenus/SIdeChapters/SideChapters';
import useSideMenu from '../../Hooks/useSideMenu';

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
        currImg: 1,
        maxImg: 1
    });
    const [images, setImages] = useState([]);

    const dispatch = useDispatch();
    const user = useSelector(store => store.user);

    // const [menuStatus, setMenuStatus] = useSideMenu('chapter');

    const fetchChapterHash = async (volume, chapter) => {
        const chaptersIds = [...mangaVolumes[volume]?.chapters[chapter]?.others, 
            mangaVolumes[volume]?.chapters[chapter]?.id];

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
        setCurrentChapter({
            ...currentChapter,
            currImg: 1,
            maxImg: images?.length || 1
        });
    }

    useEffect(() => {
        const header = document.querySelector('.header-block');
        if (user?.menuStatus?.status) {
            header.style.position = "sticky";
            // header.style.backgroundColor = "white";
        } else {
            header.style.position = "relative";
        }
        return () => {
            header.style.position = "sticky";
        }
    }, [user?.menuStatus?.status])

    useEffect(() => {
        const fetchVolumes = async () => {
            // const mangaInfo = await MangaDexApi.getMangaInfo(mangaId);
            // console.log(mangaInfo);
            // const findManga = await MangaDexApi.findManga(mangaInfo?.data?.attributes?.title?.en);
            // console.log(findManga);
            
            const volumes = await MangaDexApi.getMangaChapters(mangaId);
            const mangaName = (await MangaDexApi.getMangaInfo(mangaId))?.data?.attributes?.title?.en;
            setMangaTitle(mangaName);
            if (!volumes?.volumes || Object.keys(volumes?.volumes).length === 0) {

                // Нужно искать мангу другую при переадресации на страницу манги

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
            fetchChapterHash(currentChapter.volume, currentChapter.chapter);
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
            currentChapter.chapter + 1 <= Object.keys(mangaVolumes[currentChapter.volume]?.chapters).length) {
            setCurrentChapter({
                ...currentChapter,
                chapter: currentChapter.chapter + 1,
                currImg: 1,
                maxImg: 1
            })
        } else if (currentChapter.currImg === currentChapter.maxImg &&
                    currentChapter.chapter + 1 > Object.keys(mangaVolumes[currentChapter.volume]?.chapters).length) {
            setCurrentChapter({
                volume: currentChapter.volume + 1,
                chapter: currentChapter.chapter + 1,
                currImg: 1,
                maxImg: 1
            })
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
                chapter: Object.keys(mangaVolumes[currentChapter.volume]?.chapters).length,
                currImg: 1,
                maxImg: 1
            })
        } else if (currentChapter.currImg === 1 &&
            currentChapter.volume !== 1 &&
            currentChapter.chapter - 1 === Object.keys(mangaVolumes[currentChapter.volume - 1]?.chapters).length) {
            setCurrentChapter({
                ...currentChapter,
                volume: currentChapter.volume - 1,
                chapter: currentChapter.chapter - 1,
                currImg: 1,
                maxImg: 1
            })
        } else if (currentChapter.currImg === 1 &&
                    currentChapter.chapter !== 1) {
            setCurrentChapter({
                ...currentChapter,
                chapter: currentChapter.chapter - 1,
                currImg: 1,
                maxImg: 1
            })
        } else {
            setCurrentChapter({
                ...currentChapter,
                currImg: currentChapter.currImg - 1
            });
        }
    }

    const handleMenu = () => {
        dispatch(setChapterMenuStatus(!user.menuStatus.chapter));
        // setMenuStatus(!menuStatus);
    }

    useEffect(() => {
        console.log(mangaVolumes);
    });

    return (
        <main className="chapter-page">
            <div className="chapter-title">
                <p className="chapter-name">{chapterTitle}</p>
                <p className="manga-name">{mangaTitle}</p>
                <div className="read-progress-info">
                    <div className='c-vol'>{`Vol. ${currentChapter?.volume}
                        Ch. ${currentChapter.chapter}`}</div>
                    <div className='c-pg'>{`Pg. ${currentChapter.currImg}/${currentChapter.maxImg}`}</div>
                    <div className='c-menu' onClick={() => handleMenu()}>Menu</div>
                </div>
                <p className="translator">Lazy Ass Scans</p>
            </div>
            <div className="chapter-content" style={{maxHeight: clientHeight}} onClick={(e) => mangaContentDelegate(e)}>
                {
                    images?.map((el, idx) => {
                        if (idx+1 === currentChapter.currImg) {
                            return <img src={el} style={{display: '', maxHeight: clientHeight, maxWidth: clientWidth - 40}} 
                                key={el} alt={`img-${idx}`} />
                        } else {
                            return <img src={el} style={{display: 'none', maxHeight: clientHeight, maxWidth: clientWidth - 40}} 
                                key={el} alt={`img-${idx}`} />
                        }
                    })
                }
            </div>
            <SideMenu options={{menuType: 'chapter'}}>
                <SideChapters data={mangaVolumes} />
            </SideMenu>
        </main>
    );
};

export default Read;