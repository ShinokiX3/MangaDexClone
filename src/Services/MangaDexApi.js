import { filterSomeAttribute } from '../Utils/filterAttribute';

class MangaDexApi {
	CorsProxy = 'https://justcors.com/tl_cf47154/';
	Setting = '?forcePort443=false';

	BaseUrl = `${this.CorsProxy}https://api.mangadex.org`;
	BaseUploadUrl = 'https://uploads.mangadex.org';
	AtHomeServer = `${this.BaseUrl}/at-home/server`;

	BaseManga = `${this.BaseUrl}/manga`;
	BaseAuthor = `${this.BaseUrl}/author`;
	BaseGroup = `${this.BaseUrl}/group`;
	BaseCover = `${this.BaseUrl}/cover`;
	BaseChapter = `${this.BaseUrl}/chapter`;
	BaseStatistics = `${this.BaseUrl}/statistics`;

	// TODO: renew api link params

	Headers = {};

	getTest = async () => {
		return await fetch(
			`https://api.mangadex.org/list/3fa85f64-5717-4562-b3fc-2c963f66af`
		).then((data) => data.json());
	};

	// Manga requests

	getInfoAboutMangas = async (mangas) => {
		try {
			return await Promise.all(
				mangas.map(async (manga) => {
					return await fetch(`${this.BaseManga}/${manga?.id}`, {
						headers: { ...this.Headers },
					}).then((data) => data.json());
				})
			);
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getSeasonalInfo = async (mangasIds) => {
		try {
			const ids = mangasIds.reduce((accu, curr) => accu + curr, '');
			return await fetch(
				`${this.BaseManga}?includes[]=cover_art&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica${ids}&limit=12`,
				{ headers: { ...this.Headers } }
			);
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getMangaChaptersFeed = async (mangaId, limit = 700) => {
		try {
			return await fetch(`${this.BaseManga}/${mangaId}/feed?limit=${limit}`, {
				headers: { ...this.Headers },
			}).then((data) => data.json());
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getSearcedManga = async (title) => {
		try {
			return await fetch(`${this.BaseManga}?title=${title}`, {
				headers: { ...this.Headers },
			}).then((data) => data.json());
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getMangaInfo = async (mangaId) => {
		try {
			return await fetch(
				`${this.BaseManga}/${mangaId}?includes[]=artist&includes[]=author&includes[]=cover_art`,
				{ headers: { ...this.Headers } }
			);
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getMangaInfoByArray = async (mangaArray, limit = 32) => {
		try {
			const ids =
				mangaArray.length > 0
					? mangaArray.reduce((accu, curr) => `&ids[]=${curr.id}` + accu, '')
					: '';
			return await fetch(
				`${this.BaseManga}?limit=${limit}&includes[]=artist&includes[]=author&includes[]=cover_art${ids}`,
				{ headers: { ...this.Headers } }
			);
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getMangaChapters = async (mangaId) => {
		try {
			return await fetch(`${this.BaseManga}/${mangaId}/aggregate`, {
				headers: { ...this.Headers },
			}).then((data) => data.json());
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getMangaCover = async (mangaId) => {
		try {
			const mangaImageId = filterSomeAttribute(
				(
					await fetch(`${this.BaseManga}/${mangaId}/`).then((data) =>
						data.json()
					)
				)?.data?.relationships,
				'cover_art'
			)?.id;
			const coverId = (
				await fetch(`${this.BaseCover}/${mangaImageId}`).then((data) =>
					data.json()
				)
			)?.data?.attributes?.fileName;
			return `${this.BaseUploadUrl}/covers/${mangaId}/${coverId}`;
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getMangaListCovers = async (mangaImagesArray) => {
		try {
			const mangaImageIds =
				mangaImagesArray.length > 0
					? mangaImagesArray.reduce(
							(accu, curr) =>
								`&ids[]=${
									filterSomeAttribute(curr?.relationships, 'cover_art')?.id
								}` + accu,
							''
					  )
					: '';

			const coverIds = await fetch(`${this.BaseCover}?${mangaImageIds}`).then(
				(data) => data.json()
			);

			const coversUrl = coverIds.data.reduce((accu, curr) => {
				const mangaId = filterSomeAttribute(curr?.relationships, 'manga')?.id;

				return {
					...accu,
					[mangaId]: `${this.BaseUploadUrl}/covers/${mangaId}/${curr?.attributes?.fileName}`,
				};
			}, {});

			return coversUrl;
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getMangaCoversByVolumes = async (mangaId, offset = 0) => {
		try {
			const mangaImageIds = await fetch(
				`${this.BaseCover}?order[volume]=asc&manga[]=${mangaId}&limit=32&offset=${offset}`,
				{ headers: { ...this.Headers } }
			).then((data) => data.json());
			const mangaCovers = mangaImageIds.data.map((coverEl) => {
				return {
					volume: coverEl?.attributes?.volume,
					filePath: `${this.BaseUploadUrl}/covers/${mangaId}/${coverEl?.attributes?.fileName}`,
				};
			});
			return { total: mangaImageIds?.total, array: mangaCovers };
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getLatestUpdateChapters = async () => {
		try {
			return await fetch(
				`${this.BaseChapter}?includes[]=manga&includes[]=scanlation_group&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[readableAt]=desc&offset=0&limit=20`
			);
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getLatestUpdateMangas = async (mangasIds) => {
		try {
			const ids = mangasIds.reduce((accu, curr) => accu + curr, '');
			return await fetch(
				`${this.BaseManga}?includes[]=cover_art${ids}&limit=24&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`
			);
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getInfoAboutChapter = async (chapters) => {
		try {
			return await Promise.all(
				chapters.map(async (el) => {
					return await fetch(`${this.BaseChapter}/${el}`).then((data) =>
						data.json()
					);
				})
			);
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getChapterHash = async (chapterId) => {
		try {
			return await fetch(
				`${this.AtHomeServer}/${chapterId}${this.Setting}`
			).then((data) => data.json());
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getChapter = async (hash, data) => {
		try {
			return await fetch(`${this.BaseUploadUrl}/data/${hash}/${data}`).then(
				(data) => data.json()
			);
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getMangaFeed = async (mangaId, offset = 0, orderBy = 'asc', limit = 500) => {
		try {
			return await fetch(
				`${this.BaseManga}/${mangaId}/feed?limit=96&includes[]=scanlation_group&includes[]=user&order[volume]=asc&order[chapter]=asc&offset=${offset}&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`,
				{ headers: { ...this.Headers } }
			);
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getScanlationGroup = async (groupId) => {
		try {
			return await fetch(`${this.BaseGroup}/${groupId}`, {
				headers: { ...this.Headers },
			}).then((data) => data.json());
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getSeasonal = async () => {
		try {
			return await fetch(
				`${
					this.CorsProxy
				}https://api.mangadex.org/list/4be9338a-3402-4f98-b467-43fb56663927?includes[]=user&limit=${20}`
			);
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getRecentlyAdded = async () => {
		try {
			return await fetch(
				`${this.BaseManga}?limit=18&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[createdAt]=desc&includes[]=cover_art`
			);
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getRecentlyCovers = async (mangasIds) => {
		try {
			const ids = mangasIds.reduce((accu, curr) => accu + curr, '');
			return await fetch(
				`${this.BaseManga}?includes[]=cover_art&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica${ids}&limit=59`
			).then((data) => data.json());
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getSearcedAuthor = async (title) => {
		try {
			return await fetch(`${this.BaseAuthor}?name=${title}`).then((data) =>
				data.json()
			);
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getAuthorInfo = async (authorId) => {
		try {
			return await fetch(`${this.BaseAuthor}/${authorId}/`);
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getSearcedGroup = async (title) => {
		try {
			return await fetch(`${this.BaseGroup}?name=${title}`).then((data) =>
				data.json()
			);
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getGroupInfo = async (groupsIds) => {
		try {
			return await Promise.all(
				groupsIds.map(async (el) => {
					return await fetch(`${this.BaseGroup}/${el}`).then((data) =>
						data.json()
					);
				})
			);
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getMangaStatistics = async (mangaId) => {
		try {
			return await fetch(`${this.BaseStatistics}/manga/${mangaId}`);
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getMangaStatisticsByArray = async (mangaArray) => {
		try {
			const ids =
				mangaArray.length > 0
					? mangaArray.reduce((accu, curr) => `&manga[]=${curr.id}` + accu, '')
					: '';
			return await fetch(`${this.BaseStatistics}/manga?${ids}`);
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getFilterTags = async () => {
		try {
			return await fetch(`${this.BaseManga}/tag`);
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getFilteredData = async (
		includeIds = [],
		excludeIds = [],
		pubDemographic = [],
		rating = [],
		status = [],
		title = '',
		order = '',
		mangaIds = [],
		limit = 32,
		offset = 0
	) => {
		// TODO: rework that three last tag types comes as one object
		try {
			const includeTags =
				includeIds.length > 0
					? includeIds?.map((tag) => `&includedTags[]=${tag}`).join('')
					: '';
			const excludeTags =
				excludeIds.length > 0
					? excludeIds?.map((tag) => `&excludedTags[]=${tag}`).join('')
					: '';

			const pubDemographics =
				pubDemographic.length > 0
					? pubDemographic
							?.map((el) => `&publicationDemographic[]=${el}`)
							.join('')
					: '';
			const contentRating =
				rating.length > 0
					? rating?.map((el) => `&contentRating[]=${el}`).join('')
					: '';
			const statusElems =
				status.length > 0
					? status?.map((el) => `&status[]=${el}`).join('')
					: '';

			const tmp = order.length > 0 ? order?.split('.') : [];
			const orderValue =
				order.length > 0
					? `&order[${tmp[0]}]=${tmp[1]}`
					: `&order[relevance]=desc`;

			const ids =
				mangaIds.length > 0
					? mangaIds.reduce((accu, curr) => `&ids[]=${curr}` + accu, '')
					: '';

			return await fetch(
				`${
					this.BaseManga
				}?limit=${limit}&offset=${offset}&includes[]=cover_art&includes[]=author&includes[]=artist${contentRating}${statusElems}${pubDemographics}${includeTags}${excludeTags}${
					title.length > 0 ? `&title=${title}` : ''
				}${orderValue}${ids}`
			);
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};

	getRandomManga = async () => {
		try {
			return await fetch(
				`${this.BaseManga}/random?contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&includes[]=artist&includes[]=author&includes[]=cover_art`,
				{ headers: { ...this.Headers } }
			).then((data) => data.json());
		} catch (e) {
			throw new Error('Failed in another way', { cause: e });
		}
	};
}

export default new MangaDexApi();
