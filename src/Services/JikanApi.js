class JikanAPI {
    BaseLink = 'https://api.jikan.moe/v3';
    
    getMangaList = async (page, selector) => {
        return await fetch(`${this.BaseLink}/top/manga/${page}/${selector}`)
        .then(data => data.json())
    }
    
    getInfoAbout = async (id) => {
        return await fetch(`${this.BaseLink}/manga/${id}`)
        .then(data => data.json())
    }

    getMangaBySearch = async (searchData) => {
        let urlString = '';
        urlString = 'volumes=14&';
        console.log(urlString);
        return await fetch(`${this.BaseLink}/search/manga?q=&r=r`)
        .then(data => data.json())
    }
}

export default new JikanAPI();