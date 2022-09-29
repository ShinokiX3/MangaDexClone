import React from 'react';

const CheckBox = ({message = '', additionalMess = '', value, additionalButt = ''}) => {
    return (
        <div className="checkbox">
            <input className="custom-checkbox" type="checkbox" id="color-5" name="color-5" value="green" required></input>
            <label htmlFor="color-5">{value} 
                {
                    additionalButt ? <p className="label-star">{additionalButt}</p> : true
                }
            </label>
            {
                message ?
                <div className="form-message">
                    <span>Created an account already and need to activate it?</span>
                    <span className="label-star">{additionalMess}</span>
                </div> :
                true
            }
        </div>
    );
};

export default CheckBox;