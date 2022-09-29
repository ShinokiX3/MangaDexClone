import { useState, useEffect } from 'react';

export const useObserver = (options) => {
    const [observerRef, setObserverRef] = useState(null);
    const [observerStatus, setObserveStatus] = useState(false);
    
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) {
                setObserveStatus(true);
            } else {
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