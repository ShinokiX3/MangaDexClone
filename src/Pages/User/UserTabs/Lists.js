import { useEffect, useState } from 'react';

const Lists = ({ userId }) => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        (async() => {
            const lists = await fetch(`https://api.mangadex.org/user/${userId}/list`)
                .then(data => data.json());
            setLists(lists?.data);
        })()
    }, []);
    
    return (
        <div>
            {lists.length < 1 
                ? <div style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: '100%',
                    minHeight: '50px',
                    color: '#242424',
                    backgroundColor: '#f0f1f2',
                    borderRadius: '.5rem',
                    fontSize: '14pt'
                 }}>No lists found</div> 
                : null
            }
        </div>
    );
};

export default Lists;