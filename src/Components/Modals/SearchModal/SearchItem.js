import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MangaDexApi from '../../../Services/MangaDexApi';
import MangaStatus from '../../Manga/MangaStatus';
import { Comments, Follows, Rating, Seen } from '../../../SharedUI/Statistics';
import Img from '../../../SharedUI/StyledComponents/Img/Img';
import avatar from '../../../Assets/Images/avatar.png';
import './searchPannel.scss';
import { filterSomeAttribute } from '../../../Utils/filterAttribute';
import MangaItem from '../../../Features/SearchItems/MangaItem';

const SearchItem = ({item, type, setActive}) => {
    const [data, setData] = useState({title: '', img: '', status: ''});
    const navigate = useNavigate();

    console.log(item);
    
    useEffect(() => {
        (async() => {
            let info, imgUrl;
            if (type === 'Manga') {
                info = await MangaDexApi.getMangaInfo(item?.id).then(data => data.json());
                imgUrl = `https://uploads.mangadex.org/covers/${info.data.id}/${filterSomeAttribute(info.data.relationships, 'cover_art', 'fileName')}`;
                imgUrl = /undefined$/gi.test(imgUrl) ? 'https://desu.shikimori.one/assets/globals/missing_x48.jpg' : imgUrl;
                setData({title: info?.data?.attributes?.title?.en, img: imgUrl, status: info?.data?.attributes?.status});
            } else if (type === 'Group') {
                setData({title: item?.attributes?.name, img: avatar});
            } else {
                setData({title: item?.attributes?.name, img: avatar});
            }
        })()
    }, [item])

    const handleSearchItem = () => {
        navigate(`/manga/${item?.id}`);
        setActive(false);
        document.body.style.overflow = "";
        document.body.style.paddingRight = "0px";
    }

    const handleUser = () => {
        navigate(`/user/${item?.id}`);
        setActive(false);
    }

    return (
        <div className={type === 'Manga' ? "sch-item-block" : ( type === 'Group' ? "sch-item-block srch-group-block" : "sch-item-block srch-author-block")} 
            onClick={type === 'Manga' ? handleSearchItem : handleUser}
        >
            {
                type === 'Manga' ?
                <div style={{height: '70px', width: '50px'}}>
                    <Img src={data.img} alt='title' classes="img-srch" />
                </div>
                :
                <img src={data.img} alt="title" className="img-srch" />
            }
            <div className="title-srch">
                <div>{data.title ?? 'Untitled'}</div>
                {
                    type === 'Manga' ? <MangaItem status={data?.status} />
                    :
                    null
                }
            </div>
        </div>
    );
};

export default SearchItem;