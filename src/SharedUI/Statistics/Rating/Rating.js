import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import ReactDOM from 'react-dom';
import { StarIcon } from '../../../Assets/Svg/Statistics';
import Flyout from '../../../Features/Flyout/Flyout';
import RatingFlyout from '../../../Components/Flyouts/RatingFlyout/RatingFlyout';
import { useMemo } from 'react';

const Rating = ({ rating, details = false }) => {
    const [shouldShow, setShouldShow] = useState(false);
    const ref = useRef();

    const finalRating = useMemo(() => {
        return String(rating.average).substring(0, 4)
    }, [rating])

    return (
        <>
        <div ref={ref} className="rating"
            onMouseOver={() => setShouldShow(true)}
            onMouseOut={() => setShouldShow(false)} 
            style={{display: 'flex', cursor: 'pointer'}}
        >
            <StarIcon alt="" />
            <p>{finalRating || "9.5"}</p>
        </div>

        {shouldShow && details
            ? ReactDOM.createPortal(
                <Flyout setShouldShow={setShouldShow}>
                    <RatingFlyout distribution={rating.distribution} />
                </Flyout>
                , ref.current)
            : null
        }
        </>
    );
};

export default Rating;