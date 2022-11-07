import { memo, useMemo } from 'react';
import styles from './pages-links.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const PageArrowLink = memo(({ title = '', link = '', arrowReDirection = false }) => {
    const navigate = useNavigate();

    // TODO: this return string val. and prob. this will not be forcing re-render anyway
    const linkClass = useMemo(() => arrowReDirection ? styles.arrow_link_reverse : styles.arrow_link_block, [arrowReDirection]);

    const handleNavigate = () => {
        navigate(`/${link}`);
    }

    return (
        <div className={linkClass}>
            <div onClick={handleNavigate}>
                {
                    arrowReDirection ? 
                    <>
                        <FontAwesomeIcon icon={faArrowRight} />
                        <h1>{title}</h1>
                    </>
                    :
                    <>
                        <h1>{title}</h1>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </>
                }
            </div>
        </div>
    );
});

export default PageArrowLink;