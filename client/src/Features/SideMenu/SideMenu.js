import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SideMain from '../../Pages/Main/SideMain/SideMain';
import './sideMenu.scss';
import useSideMenu from '../../Hooks/sideMenu';

const SideMenu = ({ children, options }) => {
    const [menuType, setMenuType] = useState();

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (options) {
            if (options.menuType === 'main') {
                setMenuType('main');
            } else if (options.menuType === 'chapter') {
                setMenuType('chapter');
            }
        }
    }, [options]);

    const setClassList = (status) => {
        if (menuType === 'main') {
            if (status === false) {
                return `side-menu side-menu-disable`;
            } else if (status === true) {
                return `side-menu side-menu-active`;
            }
        }
        if (menuType === 'chapter') {
            if (status === false) {
                return `side-menu side-chapter-disable`;
            } else if (status === true) {
                return `side-menu side-menu-active side-menu-color side-chapter-active side-shadow`;
            }
        }
    }

    return (
        <>
            <div className={setClassList(user.menuStatus[menuType])}>
                <div className="side_wrapp">
                    {
                        children
                    }
                </div>
            </div>
            <div className={!user.menuStatus[menuType] ? "side-menu-add-block" : "side-menu-add-block side-menu-block-active"}></div>
        </>
    );
};

export default SideMenu;