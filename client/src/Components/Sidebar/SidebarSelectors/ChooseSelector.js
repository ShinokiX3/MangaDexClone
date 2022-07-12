import React from 'react';

const ChooseSelector = (props) => {
    const { title, chosenData, func } = props;
    return (
        <div className="choose-selector"
            onClick={() => func(title)}>
            <p className="question">{title}</p>
            <p className="answer">{chosenData.length > 0 ? chosenData.join(', ') : 'Any'}</p>
        </div>
    );
};

export default ChooseSelector;