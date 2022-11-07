import { useState } from 'react';
import styles from './cover.module.scss';
import { ExploreIco } from '../../../Assets/Svg/Covers';
import { flags } from '../../../Assets/Svg/Flags';

import Img from '../Img/Img';

import Modal from '../../../Features/Modal/Modal';
import CoverModal from '../../../Components/Modals/CoverModal/CoverModal';

const Cover = ({ children, src='', alt='', style={}, stylesList={height: '320px', width: '200px'}, 
    classLists = {wrapp: '', img: ''}, countryIco = null, isExploreIco = true }) => {

    const [coverModal, setCoverModal] = useState(false);

    const handleModal = () => {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "7px";
        setCoverModal(!coverModal);
    }

    // TODO: lazy, suspense

    return (
        <>
        <div className={`${styles.wrapp} ${classLists.wrapp}`} style={style} onClick={handleModal}>
            <Img 
                src={src} 
                alt={alt} 
                classes={classLists.img + ' ' + style.cover_img} 
                height={stylesList.height} 
                width={stylesList.width} 
            />
            {
                isExploreIco ?
                    <ExploreIco data-svg="explore-ico" />
                :
                    null
            }
            {
                countryIco ?
                    <img data-svg="flag-img" src={flags['jp']} alt='jp'></img>
                :
                    null
            }
            {
                children ?
                    children 
                :
                    null
            }
        </div>
        {coverModal ?
            <Modal 
                active={coverModal} 
                setActive={setCoverModal} 
                styleModalContent={{padding: '0px', height: '100%', overflow: 'hidden', borderRadius: '0px'}}
            >
                <CoverModal setActive={setCoverModal} src={src} />
            </Modal>
            :
            null
        }
        </>
    );
};

export default Cover;