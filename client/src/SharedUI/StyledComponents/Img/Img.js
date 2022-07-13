import React, { useEffect, useState } from 'react';
import LoadingWrapp from '../../LoadComponents/LoadingWrapp/LoadingWrapp';

const Img = ({ src = '', alt = '', classes = '', height, width, draggable = true}) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setIsLoading(false);
        }
    }, [src]);
    return (
        isLoading ?
        <LoadingWrapp height={height} width={width} />
        :
        <img src={src} alt={alt} className={classes} draggable={draggable} />
    );
};

export default Img;