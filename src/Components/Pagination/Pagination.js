import React, { useEffect, useState } from 'react';
import { DotsIcon } from '../../Assets/Svg/Pagination';

const Pagination = ({ pages, currPage, step, setOffset, setCurrPage }) => {
    const handlePageChange = (page) => {
        setOffset((page - 1) * step);
        setCurrPage(page);
    }

    return (
        <div className="page-block">
            {
                Array.from(Array(pages), (e, idx) => {
                    if (idx + 1 >= currPage - 2 && idx + 1 <= currPage + 2) {
                        return <PaginationItem key={idx} idx={idx} currPage={currPage} handlePageChange={handlePageChange} />
                    } else if (idx + 1 === currPage - 3 || idx + 1 === currPage + 3) {
                        return (
                            <div key={idx}>
                                {
                                    idx + 1 === currPage - 3 ? 
                                    <div style={{display: 'flex'}}>
                                        <PaginationItem key={0} idx={0} currPage={currPage} handlePageChange={handlePageChange} />
                                        <PaginationVariable idx={'left'} pages={pages} handlePageChange={handlePageChange} />
                                    </div>
                                    :
                                    <div style={{display: 'flex'}}>
                                        <PaginationVariable key={'right'} idx={'right'} pages={pages} handlePageChange={handlePageChange} />
                                        <PaginationItem idx={pages - 1} currPage={currPage} handlePageChange={handlePageChange} />
                                    </div>
                                }
                            </div>
                        )
                    }
                })
            }
        </div>
    );
};

const PaginationItem = ({ idx, currPage, handlePageChange }) => {
    return (
        <span key={idx + 1} 
            className={ idx === currPage - 1 ? "page-span pg-active" : "page-span"}
            onClick={() => handlePageChange(idx + 1)}>{idx + 1}
        </span>
    )
}

const PaginationVariable = ({ idx, pages, handlePageChange }) => {
    const [value, setValue] = useState('');
    const [variable, setVariable] = useState('dots');

    useEffect(() => {
        if (variable === 'input') {
            window.addEventListener('click', handleWindowClick);
            window.addEventListener('keyup', handleWindowKeyup);
        }
        return () => {
            window.removeEventListener('click', handleWindowClick);
            window.removeEventListener('keyup', handleWindowKeyup);
        }
    }, [value])

    const handleVariable = () => {
        setVariable('input');
    }

    const handleValue = (e) => {
        const value = +(e.target.value.match(/\d*/gi).join(''));
        setValue(value === 0 ? '' : value);
    }

    const handleWindowKeyup = (e) => {
        if (e.key === 'Enter') handleWindowClick();
    }

    const handleWindowClick = () => {
        if (value > 0 && value <= pages) {
            handlePageChange(value);
            setVariable('dots');
        }
    }

    return (
        <span key={idx} className={variable === 'dots' ? "page-span pg-dots" : "pg-span-input"}
            onClick={() => handleVariable()}>
            {
                variable === 'dots' ? 
                    <DotsIcon /> 
                        : 
                    <input 
                        onChange={(e) => handleValue(e)} 
                        value={value}
                        className="pg-input" type="text" 
                    />
            }
        </span>
    )
}

export default Pagination;