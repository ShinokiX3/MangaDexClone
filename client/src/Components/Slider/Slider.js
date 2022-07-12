import React, { useEffect, useRef, useState } from 'react';
import './slider.scss';

const Slider = ({children}) => {
    const [xCurr, setXCurr] = useState(0);
    const [currentLeft, setCurrentLeft] = useState(0);
    const [secArr, setSecArr] = useState([]);

    const sliderWindow = useRef(null);
    const sliderContent = useRef(null);
    const sliderControls = useRef(null);

    const slidemove = (e, iniX) => {
        setXCurr(+e.clientX - +iniX);
    }

    useEffect(() => {
        sliderContent.current.style.left = `${+currentLeft + xCurr}px`;
    }, [xCurr])

    useEffect(() => {
        const items = sliderContent.current.children;
        if (items.length !== 0) {
            const itemWidth = items[0].offsetWidth + +window.getComputedStyle(items[0]).getPropertyValue("margin-right").split('px')[0];

            let initial = 0;
            const arr = Array.from(items).map((item, index) => {
                const res = {
                    z: initial,
                    x: initial - itemWidth,
                    i: initial < -sliderContent.current.clientWidth + sliderWindow.current.clientWidth ? "" : index
                }
                initial -= itemWidth;
                return res;
            });
            if (secArr.length < 1) setSecArr(arr);
        }
    }, [children, sliderContent])

    useEffect(() => {
        let instance = '';
        if (sliderWindow && sliderWindow.current) {
            instance = sliderWindow.current;
            setCurrentLeft(window.getComputedStyle(instance).getPropertyValue("left").split('px')[0]);
            instance.addEventListener("mousedown", slide, false);
        }
        return () => {
            instance.removeEventListener("mousedown", slide, false);
            document.onmouseup = null;
        }
    }, [children, sliderContent])

    const animate = (sliderContent) => {
        sliderContent.style.transition = "0.4s all";
        sliderContent.style.transitionTimingFunction = "ease-out";
        setTimeout(() => {
            sliderContent.style.transition = "";
        }, 400);
    }

    const slide = (e) => {
        const iniX = +e.clientX;

        document.onmousemove = function(e) {
            slidemove(e, iniX);
        };

        document.onmouseup = function() {
            document.onmousemove = null;
            document.dragend = null;

            setCurrentLeft(window.getComputedStyle(sliderContent.current).getPropertyValue("left").split('px')[0]);

            const items = sliderContent.current.children;
            const itemWidth = items[0].offsetWidth + +window.getComputedStyle(items[0]).getPropertyValue("margin-right").split('px')[0];

            let initial = 0;
            const arr = secArr.length > 1 ? secArr : Array.from(items).map((item, index) => {
                const res = {
                    z: initial,
                    x: initial - itemWidth,
                    i: initial < -sliderContent.current.clientWidth + sliderWindow.current.clientWidth ? "" : index
                }
                initial -= itemWidth;
                return res;
            });

            const styleLeft = +window.getComputedStyle(sliderContent.current).getPropertyValue("left").split('px')[0];
            const styleRight = +window.getComputedStyle(sliderContent.current).getPropertyValue("right").split('px')[0];

            if (styleLeft > 0) {
                setCurrentLeft(0);
                sliderContent.current.style.left = "0px";
                animate(sliderContent.current);
            }

            if (styleRight > -5) {
                const right = sliderContent.current.clientWidth - sliderWindow.current.clientWidth;
                setCurrentLeft(right*-1);
                sliderContent.current.style.left = `-${right}px`;
                animate(sliderContent.current);
            }

            let itemPos = arr.find(item => item.z >= styleLeft && item.x <= styleLeft);

            if (itemPos !== undefined && styleRight + itemWidth / 2 < -5) {
                if (styleLeft < itemPos.x + itemWidth / 2) {
                    sliderContent.current.style.left = `-${itemPos.x}px`;
                    animate(sliderContent.current);
                    handleControl(itemPos.i, false);
                    setCurrentLeft(itemPos.x);
                    setXCurr(0);
                } else {
                    sliderContent.current.style.left = `-${itemPos.z}px`;
                    animate(sliderContent.current);
                    handleControl(itemPos.i, false);
                    setCurrentLeft(itemPos.z);
                    setXCurr(0);
                }
            }
        };
        // document.onmouseup = null;
    }

    const handleControl = (control, isResetLeft = true) => {
        if (isResetLeft) {
            setCurrentLeft(secArr[control].z);
            setXCurr(0);
            sliderContent.current.style.left = `${secArr[control].z}px`;
            animate(sliderContent.current);
        }
        const controlsDOM = sliderControls.current.children;
        const controls = Array.from(controlsDOM);
        controls.map(item => item.classList.remove('active-control'));
        controls[control].classList.add('active-control');
    }

    return (
        <div className="slider-window" ref={sliderWindow}>
            <div className="slider-content" ref={sliderContent}>
                {
                    children
                }
            </div>
            <div className="slider-controls" ref={sliderControls}>
                {
                    secArr.map((item, index) => {
                        if (item.i !== "") {
                            return (
                                <span className={`control ${index === 0 ? "active-control" : ""}`} 
                                    key={`control-${index}`}
                                    onClick={() => handleControl(index)}></span>
                            )
                        } else {
                            return true
                        }
                    })
                }
            </div>
        </div>
    );
};

export default Slider;