import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import MangaDexApi from '../../../Services/MangaDexApi';

const MangaItems = ({mangas = [], Variant, Wrapp = true, styles = {}}) => {
    const [mangaListCovers, setMangaListCovers] = useState({});

    useEffect(() => {
        if (mangas.length > 0) {
            (async () => {
                const resp = await MangaDexApi.getMangaListCovers(mangas);
                setMangaListCovers(resp);
            })()
        }
    }, [mangas]);

    return (
        mangas?.map((item) => (
            <Wrapp key={item.id} styles={styles} manga={item}>
                <Variant manga={item} mangaCover={mangaListCovers[item.id]} />
            </Wrapp>
        ))
    );
};

export default MangaItems;