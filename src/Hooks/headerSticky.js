import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useHeaderSticky = () => {
    const [headerRef, setHeaderRef] = useState(null);
    const [searchBlockRef, setSearchBlockRef] = useState(null);
    const [logoRef, setLogoRef] = useState(null);
    const [rightLinksRef, setRightLinksRef] = useState(null);

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.header.ref) {
            setHeaderRef(user.header.ref);
        }
    }, [user.header.ref]);

    useEffect(() => {
        if (headerRef) {
            setSearchBlockRef(headerRef.querySelector('.search-block'));
            setLogoRef(headerRef.querySelector('.logo'));
            setRightLinksRef(headerRef.querySelector('.right-links_wrapp'));
        }
    }, [headerRef]);

    useEffect(() => {
        console.log(searchBlockRef, logoRef, rightLinksRef);   
    });

    const addStyles = () => {
        if (headerRef && searchBlockRef && logoRef && rightLinksRef) {
            headerRef.classList.remove('header-white');
            headerRef.classList.add('header-transparent');

            searchBlockRef.classList.add('srch-block-rgba');
            searchBlockRef.classList.add('search-block-dark');
            logoRef.classList.add('logo-dark');
            rightLinksRef.classList.add('right-links_wrapp-dark');
        }
    }

    const removeStyles = () => {
        if (headerRef && searchBlockRef && logoRef && rightLinksRef) {
            headerRef.classList.remove('header-transparent');
            headerRef.classList.add('header-white');

            searchBlockRef.classList.remove('search-block-dark');
            searchBlockRef.classList.add('srch-block-initial');
            logoRef.classList.remove('logo-dark');
            rightLinksRef.classList.remove('right-links_wrapp-dark');
        }
    }

    return [addStyles, removeStyles];
};