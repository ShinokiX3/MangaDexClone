import React, { useState, useEffect, useRef } from 'react';

export const useObserver = (options) => {
    const [observerRef, setObserverRef] = useState(null);
    const [observerStatus, setObserveStatus] = useState(false);
    
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            console.log(entry);
            if (!entry.isIntersecting) {
                console.log('out of');
                setObserveStatus(true);
            } else {
                console.log('inn');
                setObserveStatus(false);
            }
        }, options);

        if (observerRef) {
            observer.observe(observerRef);
        }

        return () => {
            if (observerRef) {
                observer.unobserve(observerRef);
            }
        }

    }, [observerRef, options]);
    
    return [observerStatus, setObserverRef];
}