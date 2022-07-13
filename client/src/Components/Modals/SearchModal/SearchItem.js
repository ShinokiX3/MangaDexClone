import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MangaDexApi from '../../../Services/MangaDexApi';
import MangaStatus from '../../Manga/MangaStatus';
import { Comments, Follows, Rating, Seen } from '../../../SharedUI/Statistics';
import Img from '../../../SharedUI/StyledComponents/Img/Img';
import './searchPannel.scss';

const SearchItem = ({item, type, setActive}) => {
    const [data, setData] = useState({title: '', img: '', status: ''});
    const navigate = useNavigate();
    
    const fetchData = async() => {
        let info, imgUrl;
        if (type === 'Manga') {
            info = await MangaDexApi.getMangaInfo(item?.id);
            imgUrl = await MangaDexApi.getMangaCover(item?.id);
            imgUrl = /undefined$/gi.test(imgUrl) ? 'https://desu.shikimori.one/assets/globals/missing_x48.jpg' : imgUrl;
            setData({title: info?.data?.attributes?.title?.en, img: imgUrl, status: info?.data?.attributes?.status});
        } else if (type === 'Group') {
            info = await MangaDexApi.getGroupInfo(item?.id);
            setData({title: info?.data?.attributes?.name, img: 'https://mangadex.org/avatar.png'});
        } else {
            info = await MangaDexApi.getAuthorInfo(item?.id);
            setData({title: info?.data?.attributes?.name, img: 'https://mangadex.org/avatar.png'});
        }
        console.log(info);
    }
    
    useEffect(() => {
        fetchData();
    }, [item])

    const handleSearchItem = () => {
        navigate(`/manga/${item?.id}`);
        setActive(false);
        document.location.reload();
        // Временное решение, не отрисовывается страница
    }

    return (
        <div className={type === 'Manga' ? "sch-item-block" : 
                        ( type === 'Group' ? "sch-item-block srch-group-block" : "sch-item-block srch-author-block")} 
                        onClick={() => handleSearchItem()}>

            <img src={data.img} alt="title" className="img-srch" />
            {/* <Img src={data.img} alt='title' classes={"img-srch"} /> */}
            <div className="title-srch">
                <div>{data.title}</div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {
                        data?.status ? <MangaStatus status={data?.status} /> : true 
                    }
                    {
                        type !== 'Manga' ? null 
                        :
                        <div className="search-modal-statistics" style={{display: 'flex'}}>
                            <Rating statistic={[]} />
                            <Follows statistic={[]} />
                            <Seen statistic={[]} />
                            <Comments statistic={[]} />
                        </div>
                    }
                </div> 
            </div>
        </div>
    );
};

export default SearchItem;