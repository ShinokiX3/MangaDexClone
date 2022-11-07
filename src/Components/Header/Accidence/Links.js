import React from 'react';
import { Link } from 'react-router-dom';

const Links = (props) => {
    return (
        props.links.map(({ title, destination }) => {
            return <Link to={destination} key={title}>{title}</Link>
        })
    );
};

export default Links;