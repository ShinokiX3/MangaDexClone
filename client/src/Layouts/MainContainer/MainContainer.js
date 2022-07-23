import { memo, useEffect } from 'react';
import { useObserver } from '../../Hooks/observer';

const MainContainer = memo(({ children, mainClasses = '', containerClasses = '', isHeaderBlack = false }) => {
    const [observerStatus, setObserverRef] = useObserver({threshold: 0});
    
    useEffect(() => {
        const headerPlug = document.querySelector('.header-plug');
        setObserverRef(headerPlug);        
    }, []);

    useEffect(() => {
        if (!observerStatus) {
            toggleStyles('add');
        } else {
            toggleStyles('remove');
        }
        return () => {
            toggleStyles('remove');
        }
    }, [observerStatus]);

    const toggleStyles = (type) => {
        const header = document.querySelector('.header-block');

        const addStyles = () => {
            header?.classList.remove('header-white');
            if (isHeaderBlack) {
                header?.classList.add('header-transparent-black');
            } else {
                header?.classList.add('header-transparent');
            }
        }

        const removeStyles = () => {
            if (isHeaderBlack) {
                header?.classList.remove('header-transparent-black');
            } else {
                header?.classList.remove('header-transparent');
            }
            header?.classList.add('header-white');
        }
        
        if (type === "add") addStyles(); else removeStyles();
    }

    return (
        <main className={mainClasses}>
            <div className={containerClasses}>
                { children }
            </div>
        </main>
    );
});

export default MainContainer;