import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SliderItem = ({children, manga, styles = {}}) => {
    const ref = useRef();
    const navigate = useNavigate();

    const [mouseMove, setMouseMove] = useState(false);

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
        <div className="slider-item" style={styles} ref={ref} 
            onMouseDown={mouseDownListener}
            onMouseUp={mouseUpListener}>
                {
                    children
                }
        </div>
    )
};

export default SliderItem;