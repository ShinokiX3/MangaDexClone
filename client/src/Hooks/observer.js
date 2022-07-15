import React, { useState, useEffect, useRef } from 'react';

export const useObserver = (options) => {
    const [ref, setRef] = useState(null);
    // const setRef = useRef(null);
    const [stickyStatus, setstickyStatus] = useState(false);
    
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                console.log('out of');
                setstickyStatus(true);
            } else {
                setstickyStatus(false);
            }
        }, options);

        if (ref) {
            observer.observe(ref);
        }

        return () => {
            if (ref) {
                observer.unobserve(ref);
            }
        }

    }, [ref, options]);
    
    return [stickyStatus, setRef];
}