import { lazy, memo, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './userpage.module.scss';
import { strToUpper } from '../../Utils/stringToUpperCase';
import CommunityLayout from '../../Layouts/CommunityLayout/CommunityLayout';
import Spinner from '../../SharedUI/LoadComponents/Spiner/Spinner';
import Lists from './UserTabs/Lists';

const Info = lazy(() => import('./UserTabs/Info'));
const Uploads = lazy(() => import('./UserTabs/Uploads'));

const UserPage = () => {
    const params = useParams();
    const userId = useMemo(() => params.id, [params]);

    const [userName, setUserName] = useState('Unnamed');
    const [currentTab, setCurrentTab] = useState();
    const [userRoles, setUserRoles] = useState([]);
    const tabs = useMemo(() => ['Info', 'Uploads', 'Lists'], []);

    useEffect(() => {
        (async() => {
            await fetch(`https://api.mangadex.org/user/${userId}`)
                .then(data => data.json())
                .then(data => {
                    console.log(data);
                    setUserName(data?.data?.attributes?.username);
                    const roles = data?.data?.attributes?.roles.map(role => strToUpper(role.split('_').slice(1).join(' ').toLowerCase()));
                    setUserRoles(roles);
                    
                })
        })()       
    }, []);

    const handleTabs = (e) => {
        if (e.target.nodeName === 'SPAN') {
            setCurrentTab(e.target.innerText);
            const elems = document.querySelectorAll('.select-tab');
            elems.forEach(el => el.classList.remove('active'));
            e.target.classList.add('active');
        }
    }

    return (
        <CommunityLayout tabs={tabs} handleTabs={handleTabs} title={userName}>
            <Suspense fallback={<Spinner customStyle={{width: '30px', height: '30px'}} />}>
                <ChangeTab currentTab={currentTab} userId={userId} userRoles={userRoles} />
            </Suspense>
        </CommunityLayout>
    );
};

const ChangeTab = memo(({ currentTab = 'Info', userId = '', userRoles = [] }) => {
    switch(currentTab) {
        case 'Info':
            return <Info userId={userId} userRoles={userRoles} />;
        case 'Uploads':
            return <Uploads userId={userId} />;
        case 'Lists':
            return <Lists userId={userId} />;
        default: 
            return <Info userId={userId} userRoles={userRoles} />;
    }
});

export default UserPage;