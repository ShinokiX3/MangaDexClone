import React from 'react';

const MangaDetails = (props) => {
    const { descrStatus, mangaInfo } = props;
    let { 
        title_japanese,
        title_english,
        synopsis,
        published,
        authors,
        genres,
        status,
        score,
        chapters
    } = mangaInfo;

    if (synopsis?.length > 200) {
        synopsis = synopsis.substring(0, 200) + '...';
    }

    if (authors?.length) {
        authors = authors[0];
    }

    if (genres?.length) {
        genres = genres.map(item => item.name).join(', ');
    }

    const scoreStars = [];
    const scoreRound = Math.floor(score); 
    for (let i = 0; i < 10; i++) {
        if (i < scoreRound) {
            scoreStars.push(<i className="fas fa-star" key={i}></i>);
        } else if (i === scoreRound) {
            scoreStars.push(<i className="fas fa-star-half-alt" key={i}></i>);
        } else {
            scoreStars.push(<i className="far fa-star" key={i}></i>);
        }
    }

    return (
        <div className={`fast-description ${descrStatus}`}>
            <h2>{title_japanese}</h2>
            <h3>{title_english}</h3>
            <p>{synopsis}</p>
            <div className="named-details">
                <p className="question">Published: </p>
                <p className="answer">{published?.string}</p>
            </div>
            <div>
                <p className="question">Authors: </p>
                <p className="answer">{authors?.name}</p>
            </div>
            <div>
                <p className="question">Genres: </p>
                <p className="answer">{genres}</p>
            </div>
            <div>
                <p className="question">Status: </p>
                <p className="answer">{status}</p>
            </div>
            <div>
                <p className="question">Chapters: </p>
                <p className="answer">{chapters}</p>
            </div>
            <div className="score">
                <div>{scoreStars}</div>
                <p>{score}</p>
            </div>
        </div>
    );
};

export default MangaDetails;