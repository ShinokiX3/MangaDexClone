import React, { useEffect, useMemo, useState } from 'react';
import LoadingWrapp from '../../LoadComponents/LoadingWrapp/LoadingWrapp';

const Img = ({ src = '', alt = '', classes = '', height, width, draggable = true, customStyles = {}}) => {
    
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const img = new Image();
        img.referrerPolicy = "no-referrer";
        img.src = src;
        img.onload = () => {
            setIsLoading(false);
        }
    }, [src]);

    const shadowSetting = useMemo(() => ({boxShadow: '0px 0px 30px 2px rgba(34, 60, 80, 0.12)'}), [])

    return (
        isLoading ?
        <LoadingWrapp height={height} width={width} />
        :
        <img src={src} referrerPolicy="no-referrer" alt={alt} className={classes} draggable={draggable} style={{...customStyles, ...shadowSetting}} />
    );
};

export default Img;