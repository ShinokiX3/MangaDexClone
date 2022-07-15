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
        // &ids[]=a1422bad-4598-4018-95ae-888435bafe67&ids[]=bc5f9952-4bb0-4f60-a1ff-b3b2186b560f&ids[]=80422e14-b9ad-4fda-970f-de370d5fa4e5&ids[]=ac4e2459-d995-45ae-8421-4c4cf4a87770&ids[]=0504da67-e636-4b3e-ab9b-48e8d4264fc6&ids[]=cee2ab81-2ab5-4c91-8715-92848ef5b2d4&ids[]=8b459a49-b40f-4614-90a2-dc0a9209a42f&ids[]=3f28c47a-bf8d-4e79-83ca-2e64fe906372&ids[]=fc83ffc3-8ec2-476c-a436-34acd795a1a7&ids[]=98052ef1-49a9-4722-a8f5-60baac437e2e&ids[]=278956f5-4f37-404e-981d-46a171f23279&ids[]=cb43467f-8e3a-4e7f-9af9-7e48c1d6d0dc&ids[]=f801e9c5-b9dc-4aee-987e-fcc16eef2f45&ids[]=a67996ca-ef48-4fd1-84d5-5319afd49108&ids[]=6ebe8b8a-7bac-45f0-8652-4b9d52b95644
        // return await fetch(`https://api.mangadex.org/manga?includes[]=cover_art&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&ids[]=cc4d6e0e-bb54-4d50-b364-9e52e1a6c962&ids[]=9ebb9963-6b92-4cfc-a570-fbf99294dadb&ids[]=d5261282-fdbf-424a-8e09-48c487085a68&ids[]=cc8dc41e-1f7e-4e52-9a8f-2e24de5e5c9c&ids[]=4ee7159c-9b8c-4fbf-a460-58c4014b28d7&ids[]=64eb46ed-8939-4a13-86a6-ae4d16845716&ids[]=b1ad0635-702d-4762-b7bd-1f9475688b5d&ids[]=e3ffe9c5-29a4-472a-b6f0-79bafa894184&ids[]=73364066-6ef4-4a98-b5f2-e9d4db62f980&ids[]=3a2ac3ce-24ca-46e0-82f7-5408774466e0&ids[]=59e90a84-655d-42c9-b1c3-740e055528b9&ids[]=79f3faba-ec45-4fe0-939a-37dc3ff7ef83&ids[]=bde14646-2fd1-45d3-8ae5-34f5acd52d47&ids[]=055f05ec-30ed-4dde-94e0-7f7cc3c86abb&ids[]=7d0379e6-4358-40bf-b303-f84121cd0b84&ids[]=937bfb69-1c3d-4b1b-8ca5-6fa5b21181aa&ids[]=5befe311-7a61-4940-8f38-dca6578d2543&ids[]=823f0015-aa41-49f5-b893-01d48089882e&ids[]=761a324d-b6e9-4b41-90e5-3bc95184c742&ids[]=61ffa74c-26a2-4a17-8f73-58708e336be5&ids[]=f1b0052a-6290-4c9b-b6ef-a9c8dbe9ed61&ids[]=d73077f0-2355-4314-a907-9dddf04c4d4b&ids[]=6e477e5b-d90c-43be-8324-1516868dfd9c&ids[]=259dfd8a-f06a-4825-8fa6-a2dcd7274230&ids[]=05f282b4-5010-48ff-8729-90059e90de57&ids[]=425f2ccf-581f-42cf-aed3-c3312fcde926&ids[]=db2227a7-7551-4233-991f-cc9dc1f20be2&ids[]=e0c9100e-287d-4417-8c17-b4e696254dc7&ids[]=733fc3ac-deca-444e-bb79-14186e00ccf1&ids[]=0861e776-968f-4549-847b-7e33c6d6555e&ids[]=d8f1d7da-8bb1-407b-8be3-10ac2894d3c6&ids[]=f81026af-1b41-465c-932b-291ce4760c00&ids[]=51573075-d985-442b-94ee-2b2e5dd8d0f8&ids[]=ea57752d-acb7-469e-aa60-43e694ded9a9&ids[]=aed24b2e-b574-4204-9702-cda5cfc567de&ids[]=55a96d76-10a2-4c4b-bc60-3a4aa8325e50&ids[]=4002af95-b501-4cce-b1bd-ccf0b21d5bdc&ids[]=12968534-b5e3-40df-9daf-a939f5586b16&ids[]=dc332d04-d3b0-413c-a767-70f5e451b031&ids[]=32fdfe9b-6e11-4a13-9e36-dcd8ea77b4e4&ids[]=d8d8ca2d-19c1-4c4c-9401-fbe32ec0cdd5&ids[]=1389d660-b9b1-4c6a-81af-eab4dbf3f22b&ids[]=da7bb886-7e6b-4174-83a9-2c478475b846&ids[]=267db3f7-fd9c-4395-ac36-9ffacd772473${ids}&limit=59`)
        const ids = mangasIds.reduce((accu, curr) => accu + curr, '');
        return await fetch(`https://api.mangadex.org/manga?includes[]=cover_art&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica${ids}&limit=60`)
            .then(data => data.json())
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
        return await fetch(`${this.BaseManga}/${mangaId}?includes[]=cover_art`)
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
            .then(data => data.json())
    }

    getLatestUpdateMangas = async (mangasIds) => {
        const ids = mangasIds.reduce((accu, curr) => accu + curr, '');
        return await fetch(`https://api.mangadex.org/manga?includes[]=cover_art${ids}&limit=24&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`)
            .then(data => data.json())
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
            .then(data => data.json())
    }

    getRecentlyAdded = async() => {
        return await fetch(`https://api.mangadex.org/manga?limit=20&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[createdAt]=desc&includes[]=cover_art`)
            .then(data => data.json())
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
}

export default new MangaDexApi();