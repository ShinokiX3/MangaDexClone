import React, { useRef } from 'react';
import { useMemo } from 'react';
import Img from '../../../SharedUI/StyledComponents/Img/Img';
import './mangaVariables.scss';

const MangaVar1 = ({ manga, mangaCover }) => {
    const ref = useRef();

    const title = useMemo(() => {
        const en = manga?.attributes?.title?.en;
        const ja = manga?.attributes?.title['ja-ro'];

        return en ? en.slice(0, 25) : ja.slice(0, 25);
    }, [manga])

    return (
        <div style={{display: "flex"}} ref={ref}>
            <div className="manga-img">
                <Img src={mangaCover} alt="" draggable={false} />
            </div>
            <div className="manga-de">
                <p>{title}</p>
                <p>{manga?.attributes?.description?.en.slice(0, 150)}</p>
            </div>   
        </div>
    );
};

export default MangaVar1;