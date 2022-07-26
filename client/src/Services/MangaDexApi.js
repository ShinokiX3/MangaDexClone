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
            // .then(data => data.json())
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

    // getLatestUpdateInfo = async (mangasIds) => {
    //     const ids = mangasIds.reduce((accu, curr) => accu + curr, '');
    //     return await fetch(`https://api.mangadex.org/manga?includes[]=cover_art&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica${ids}&limit=60`)
    //         .then(data => data.json())
    // }

    // Chapters requests

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
    // Cutsom lists requests

    getSeasonal = async() => {
        return await fetch(`https://api.mangadex.org/list/7df1dabc-b1c5-4e8e-a757-de5a2a3d37e9?includes[]=user`)
    }

    getRecentlyAdded = async() => {
        return await fetch(`https://api.mangadex.org/manga?limit=20&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[createdAt]=desc&includes[]=cover_art`)
    }

    getRecentlyCovers = async(mangasIds) => {
        const ids = mangasIds.reduce((accu, curr) => accu + curr, '');
        return await fetch(`https://api.mangadex.org/manga?includes[]=cover_art&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica${ids}&limit=59`)
            .then(data => data.json())
    } 

    // Author requests
    
    getSearcedAuthor = async (title) => {
        return await fetch(`${this.BaseAuthor}?name=${title}`)
            .then(data => data.json())
    }

    getAuthorInfo = async(authorId) => {
        return await fetch(`${this.BaseAuthor}/${authorId}/`)
    }

    // Group requests

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

    // Statistics

    getMangaStatistics = async(mangaId) => {
        return await fetch(`${this.BaseStatistics}/manga/${mangaId}`)
    }

    getFilterTags = async() => {
        return await fetch(`${this.BaseManga}/tag`)
    }

    getFilteredData = async(includeIds = [], excludeIds = [], pubDemographic = [], rating = [], status = [], title = '', limit = 32, offset = 0) => {
    
        // TODO: rework that three last tag types comes as one object  

        const includeTags = includeIds.length > 0 ? includeIds?.map(tag => `&includedTags[]=${tag}`).join('') : '';
        const excludeTags = excludeIds.length > 0 ? excludeIds?.map(tag => `&excludedTags[]=${tag}`).join('') : '';
        
        const pubDemographics = pubDemographic.length > 0 ? pubDemographic?.map(el => `&publicationDemographic[]=${el}`).join('') : ''; 
        const contentRating = rating.length > 0 ? rating?.map(el => `&contentRating[]=${el}`).join('') : ''; 
        const statusElems = status.length > 0 ? status?.map(el => `&status[]=${el}`).join('') : ''; 

        console.log(includeTags);
        return await fetch(`${this.BaseManga}?limit=${limit}&offset=${offset}&includes[]=cover_art&includes[]=author&includes[]=artist${contentRating}${statusElems}${pubDemographics}${includeTags}${excludeTags}${title.length > 0 ? `&title=${title}` : ''}&order[relevance]=desc`)
    }
    // https://api.mangadex.org/manga?limit=32&offset=0&includes[]=cover_art&includes[]=author&includes[]=artist&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&includedTags[]=f4122d1c-3b44-44d0-9936-ff7502c39ad3&includedTags[]=51d83883-4103-437c-b4b1-731cb73d786c&excludedTags[]=0a39b5a1-b235-4886-a747-1d05d216532d&excludedTags[]=b13b2a48-c720-44a9-9c77-39c9979373fb&order[relevance]=desc
}

export default new MangaDexApi();