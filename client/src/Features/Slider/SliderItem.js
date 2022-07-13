import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SliderItem = ({children, manga, styles = {}}) => {
    const ref = useRef();
    const navigate = useNavigate();
    
    const handleClick = (mouseMoveListener, manga) => {
        ref.current.onmouseup = null;
        ref.current.removeEventListener("mousemove", mouseMoveListener);
        navigate(`/manga/${manga?.id}`);
    }

    const mouseDownListener = () => {
        let flag = true;
        const mouseMoveListener = () => {
            flag = false;
        }
        ref.current.addEventListener("mousemove", mouseMoveListener);
        setTimeout(() => {
            if (flag === true) {
                ref.current.onmouseup = handleClick(mouseMoveListener, manga);
            } else {
                ref.current.removeEventListener("mousemove", mouseMoveListener);
            }
        }, 150);
    }
    
    return (
        <div className="slider-item" style={styles} ref={ref} onMouseDown={mouseDownListener}>
                {
                    children
                }
        </div>
    )
};

export default SliderItem;