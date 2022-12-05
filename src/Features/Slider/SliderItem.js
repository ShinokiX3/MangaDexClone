import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SliderItem = ({children, manga, styles = {}}) => {
    const [mouseMove, setMouseMove] = useState(false);
    const navigate = useNavigate();
    const ref = useRef();

    const mouseMoveListener = useCallback(() => {
        ref.current.removeEventListener("mousemove", mouseMoveListener);
        setMouseMove(true);
    }, []);

    const handleClick = (manga) => {
        ref.current.removeEventListener("mousemove", mouseMoveListener);
        ref.current.onmouseup = null;
        navigate(`/manga/${manga?.id}`);
    }

    const mouseDownListener = () => {
        ref.current.addEventListener("mousemove", mouseMoveListener);
    }

    const mouseUpListener = () => {
        if (!mouseMove) {
            handleClick(manga);
        } else {
            ref.current.removeEventListener("mousemove", mouseMoveListener);
            setMouseMove(false);
        }
    }
    
    return (
        <div onMouseDown={mouseDownListener} onMouseUp={mouseUpListener} className="slider-item" style={styles} ref={ref}>
            { children }
        </div>
    )
};

export default SliderItem;