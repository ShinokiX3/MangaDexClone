import React, { lazy, memo, Suspense, useMemo, useState } from 'react';
import Spinner from '../../../SharedUI/LoadComponents/Spiner/Spinner';
import { filterSomeAttributes } from '../../../Utils/filterSomeAttributes';

const ArtTab = lazy(() => import('../MangaTabs/Art/ArtTab'));
const ChaptersTab = lazy(() => import('../MangaTabs/Chapters/ChaptersTab'));
const RelatedTab = lazy(() => import('../MangaTabs/Related/RelatedTab'));

const MangaContent = memo(({ mangaId = '' }) => {
    const [currentTab, setCurrentTab] = useState('Chapters');

    const handleTabs = (e) => {
        if (e.target.nodeName === 'SPAN') {
            setCurrentTab(e.target.innerText);
            const elems = document.querySelectorAll('.select-tab');
            elems.forEach(el => el.classList.remove('active'));
            e.target.classList.add('active');
        }
    }

    return (
        <div className="content">
            <div className="selectors" onClick={handleTabs}>
                <span className="select-tab active">Chapters</span>
                <span className="select-tab">Art</span>
                <span className="select-tab">Related</span>
            </div>
            <div className="variable-content">
            <Suspense fallback={<Spinner customStyle={{width: '30px', height: '30px'}} />}>
                <ChangeTab currentTab={currentTab} mangaId={mangaId} />
            </Suspense>
            </div>
        </div>
    );
});

const ChangeTab = memo(({ currentTab, mangaId }) => {
    switch(currentTab) {
        case 'Chapters':
            return <ChaptersTab mangaId={mangaId} />;
        case 'Art':
            return <ArtTab mangaId={mangaId} />;
        case 'Related':
            return <RelatedTab />;
        default: 
            return <ChaptersTab mangaId={mangaId} />;
    }
});


export default MangaContent;