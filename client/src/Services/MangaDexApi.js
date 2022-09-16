class MangaDexApi {
    BaseUrl = 'https://api.mangadex.org';
    BaseUploadUrl = 'https://uploads.mangadex.org';
    AtHomeServer = `${this.BaseUrl}/at-home/server`;

    BaseManga = `${this.BaseUrl}/manga`;
    BaseAuthor = `${this.BaseUrl}/author`;
    BaseGroup = `${this.BaseUrl}/group`;
    BaseCover = `${this.BaseUrl}/cover`;
    BaseChapter = `${this.BaseUrl}/chapter`;
    BaseStatistics = `${this.BaseUrl}/statistics`

    Setting = '?forcePort443=false';

    getTest = async() => {
        return await fetch(`https://api.mangadex.org/list/3fa85f64-5717-4562-b3fc-2c963f66af`)
            .then(data => data.json())
    }

    // Manga requests

    getInfoAboutMangas = async (mangas) => {
        return await Promise.all(mangas.map(async (manga) => {
            return await fetch(`${this.BaseManga}/${manga?.id}`)
                .then(data => data.json())
        }));
    }

    getSeasonalInfo = async (mangasIds) => {
        const ids = mangasIds.reduce((accu, curr) => accu + curr, '');
        return await fetch(`https://api.mangadex.org/manga?includes[]=cover_art&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica${ids}&limit=60`)
    }

    getMangaChaptersFeed = async (mangaId, limit = 700) => {
        return await fetch(`${this.BaseManga}/${mangaId}/feed?limit=${limit}`)
            .then(data => data.json())
    }

    getSearcedManga = async (title) => {
        return await fetch(`${this.BaseManga}?title=${title}`)
            .then(data => data.json())
    }

    getMangaInfo = async (mangaId) => {
        return await fetch(`${this.BaseManga}/${mangaId}?includes[]=artist&includes[]=author&includes[]=cover_art`)
    }
    
    getMangaChapters = async (mangaId) => {
        return await fetch(`${this.BaseManga}/${mangaId}/aggregate`)
            .then(data => data.json())
    }

    getMangaCover = async (mangaId) => {
        const mangaImageId = ( await fetch(`${this.BaseManga}/${mangaId}/`)
            .then(data => data.json()) )?.data?.relationships[2]?.id;
        const coverId = ( await fetch(`${this.BaseCover}/${mangaImageId}`)
            .then(data => data.json()) )?.data?.attributes?.fileName;
        return `${this.BaseUploadUrl}/covers/${mangaId}/${coverId}`;
    }

    getMangaCoversByVolumes = async (mangaId, offset = 0) => {
        const mangaImageIds = await fetch(`${this.BaseCover}?order[volume]=asc&manga[]=${mangaId}&limit=32&offset=${offset}`)
            .then(data => data.json())
        const mangaCovers = mangaImageIds.data.map(coverEl => {
            return {
                volume: coverEl?.attributes?.volume,
                filePath: `${this.BaseUploadUrl}/covers/${mangaId}/${coverEl?.attributes?.fileName}`
            }
        });
        return {total: mangaImageIds?.total, array: mangaCovers};
    }

    getLatestUpdateChapters = async () => {
        return await fetch(`https://api.mangadex.org/chapter?includes[]=manga&includes[]=scanlation_group&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[readableAt]=desc&offset=0&limit=24`)
    }

    getLatestUpdateMangas = async (mangasIds) => {
        const ids = mangasIds.reduce((accu, curr) => accu + curr, '');
        return await fetch(`https://api.mangadex.org/manga?includes[]=cover_art${ids}&limit=24&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`)
    }

    getInfoAboutChapter = async (chapters) => {
        return await Promise.all(chapters.map(async (el) => {
            return await fetch(`${this.BaseChapter}/${el}`)
                .then(data => data.json())
        }));
    }

    getChapterHash = async (chapterId) => {
        return await fetch(`${this.AtHomeServer}/${chapterId}${this.Setting}`)
            .then(data => data.json())
    }

    getChapter = async (hash, data) => {
        return await fetch(`${this.BaseUploadUrl}/data/${hash}/${data}`) 
            .then(data => data.json());
    }

    getMangaFeed = async (mangaId, offset = 0, orderBy = 'asc', limit = 500) => {
        return await fetch(`${this.BaseManga}/${mangaId}/feed?limit=96&includes[]=scanlation_group&includes[]=user&order[volume]=asc&order[chapter]=asc&offset=${offset}&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`)
            // .then(data => data.json());
    }

    getScanlationGroup = async (groupId) => {
        return await fetch(`${this.BaseGroup}/${groupId}`)
            .then(data => data.json());
    }

    getSeasonal = async() => {
        return await fetch(`https://api.mangadex.org/list/7df1dabc-b1c5-4e8e-a757-de5a2a3d37e9?includes[]=user&limit=${20}`)
    }

    getRecentlyAdded = async() => {
        return await fetch(`https://api.mangadex.org/manga?limit=20&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[createdAt]=desc&includes[]=cover_art`)
    }

    getRecentlyCovers = async(mangasIds) => {
        const ids = mangasIds.reduce((accu, curr) => accu + curr, '');
        return await fetch(`https://api.mangadex.org/manga?includes[]=cover_art&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica${ids}&limit=59`)
            .then(data => data.json())
    } 

    getSearcedAuthor = async (title) => {
        return await fetch(`${this.BaseAuthor}?name=${title}`)
            .then(data => data.json())
    }

    getAuthorInfo = async(authorId) => {
        return await fetch(`${this.BaseAuthor}/${authorId}/`)
    }

    getSearcedGroup = async (title) => {
        return await fetch(`${this.BaseGroup}?name=${title}`)
            .then(data => data.json())
    }

    getGroupInfo = async(groupsIds) => {
        return await Promise.all(groupsIds.map(async (el) => {
            return await fetch(`${this.BaseGroup}/${el}`)
                .then(data => data.json())
        }));
    }

    getMangaStatistics = async(mangaId) => {
        return await fetch(`${this.BaseStatistics}/manga/${mangaId}`)
    }

    getFilterTags = async() => {
        return await fetch(`${this.BaseManga}/tag`)
    }

    getFilteredData = async(includeIds = [], excludeIds = [], pubDemographic = [], rating = [], status = [], title = '', order = '', mangaIds = [], limit = 32, offset = 0) => {
    
        // TODO: rework that three last tag types comes as one object  

        const includeTags = includeIds.length > 0 ? includeIds?.map(tag => `&includedTags[]=${tag}`).join('') : '';
        const excludeTags = excludeIds.length > 0 ? excludeIds?.map(tag => `&excludedTags[]=${tag}`).join('') : '';
        
        const pubDemographics = pubDemographic.length > 0 ? pubDemographic?.map(el => `&publicationDemographic[]=${el}`).join('') : ''; 
        const contentRating = rating.length > 0 ? rating?.map(el => `&contentRating[]=${el}`).join('') : ''; 
        const statusElems = status.length > 0 ? status?.map(el => `&status[]=${el}`).join('') : ''; 

        const tmp = order.length > 0 ? order?.split('.') : [];
        const orderValue = order.length > 0 ? `&order[${tmp[0]}]=${tmp[1]}` : `&order[relevance]=desc`;

        const ids = mangaIds.length > 0 ? mangaIds.reduce((accu, curr) => `&ids[]=${curr}` + accu, '') : '';

        return await fetch(`${this.BaseManga}?limit=${limit}&offset=${offset}&includes[]=cover_art&includes[]=author&includes[]=artist${contentRating}${statusElems}${pubDemographics}${includeTags}${excludeTags}${title.length > 0 ? `&title=${title}` : ''}${orderValue}${ids}`)
    }

    getRandomManga = async() => {
        return await fetch(`https://api.mangadex.org/manga/random?contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&includes[]=artist&includes[]=author&includes[]=cover_art`).then(data => data.json());
    }
}

export default new MangaDexApi();