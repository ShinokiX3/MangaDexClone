import React from 'react';

const MangaItems = ({mangas = [], Variant, Wrapp = true, styles = {}}) => {
    return (
        mangas?.map(item => (
            <Wrapp styles={styles} manga={item}>
                <Variant manga={item}/>
            </Wrapp>
        ))
    );
};

export default MangaItems;