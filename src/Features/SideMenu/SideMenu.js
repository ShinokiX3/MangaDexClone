import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import './sideMenu.scss';

const SideMenu = ({ children, options }) => {
    const menu = useSelector(state => state.menu[options.menuType+'Menu']);

    const classList = useMemo(() => determineClassList(menu.title, menu.status), [menu])

    function determineClassList(type, status) {
        const variablesStyles = [
            {
                type: 'mainMenu',
                active: 'side-menu side-menu-active',
                disable: 'side-menu side-menu-disable'
                
            },
            {
                type: 'readerMenu',
                active: 'side-menu side-menu-active side-menu-color side-chapter-active side-shadow',
                disable: 'side-menu side-chapter-disable'
            }
        ]
        const currentType = variablesStyles.filter(el => el.type === type)[0];
        return status ? currentType.active : currentType.disable;
    }

    return (
        <>
            <div className={classList}>
                <div className="side_wrapp"> { children } </div>
            </div>
            <div className={!menu?.status ? "side-menu-add-block" : "side-menu-add-block side-menu-block-active"}></div>
        </>
    );
};

export default SideMenu;