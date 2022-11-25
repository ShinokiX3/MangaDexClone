import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoggedControls from "./LoggedControls";
import UnLoggedControls from "./UnLoggedControls";

const MangaControls = ({ mangaInfo={}, children }) => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);
    
    const redirectToReader = () => {
        navigate(`/chapter/${mangaInfo?.data?.id}`);
    }

    return (
        <div className="buttons_wrapp">
            {user.username 
                ? <LoggedControls redirectToReader={redirectToReader} />
                : <UnLoggedControls redirectToReader={redirectToReader} />
            }
        </div>
    )
}

export default MangaControls;