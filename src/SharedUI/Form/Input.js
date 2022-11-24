import React from 'react';

const Input = ({type, id, placeholder, value, setValue, isReq = false}) => {
    return (
        <div className="text-field text-field_floating">
            <input 
                className="text-field__input" 
                type={type} 
                id={id} 
                placeholder={placeholder} 
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}></input>
            <label className="text-field__label" htmlFor={id}>{placeholder}<p className="label-star">*</p></label>  
        </div>
    );
};

export default Input;