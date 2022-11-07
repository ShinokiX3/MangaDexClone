import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Form = ({type, additional = '', children}) => {
    return (
        <div className="form_wrapper">
            <form>
                <div className="singup-title">
                    <div>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <h1>{type}</h1>
                    </div>
                    {
                        additional ? <p>{additional}</p> : true
                    }
                </div>
                {
                    children
                }
            </form>
        </div>
    );
};

export default Form;