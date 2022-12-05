import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Form = ({type, additional = '', children}) => {
    return (
        <div className="form_wrapper">
            <form onSubmit={e => e.preventDefault()}>
                <div className="singup-title">
                    <div>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <h1>{type}</h1>
                    </div>
                    { additional ? <p>{additional}</p> : null }
                </div>
                { children }
            </form>
        </div>
    );
};

export default Form;