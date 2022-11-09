import { filterSomeAttribute } from "../../Utils/filterAttribute";
import { filterObjForTags } from "../../Utils/filterObjForTags";
import { filterTags } from "../../Utils/filterTags";
import { strToUpper } from "../../Utils/stringToUpperCase";

export const configureTags = (manga) => {
    const mangaInfo = manga?.data?.attributes;
    const author = [filterSomeAttribute(manga?.data?.relationships, 'author')];    
    const artist = [filterSomeAttribute(manga?.data?.relationships, 'artist')];    
    const tags = filterObjForTags(mangaInfo, 'tags');
    
    const links = filterObjForTags(mangaInfo, 'links', true);
    const readOrBuyArr = links.filter(item => Object.values(item)[0]
        .match(/http/gi));

    const readOrBuy = readOrBuyArr.map(item => {
        const linkName = Object.values(item)[0].match(/(?<=www.)\w+(?=.)/gi);
        return {attributes: {
            type: Object.keys(item)[0],
            link: Object.values(item)[0],
            name: linkName ? strToUpper(linkName[0]) : strToUpper(Object.values(item)[0].match(/(?<=\/\/)\w+(?=.)/gi)[0])
        }}
    })

    const trackArr = links.filter((item, index) => !Object.values(item)[0]
        .match(/http/gi) && index !== links.length - 1);

    const track = trackArr.map(item => {
        return {attributes: {
            type: Object.keys(item)[0],
            link: Object.values(item)[0],
            name: strToUpper(Object.keys(item)[0])
        }}
    })

    const demographicString = filterObjForTags(mangaInfo, 'publicationDemographic')[0]; 

    const demographic = [{
        attributes: {name: strToUpper(demographicString)}
    }];

    const genres = filterTags(tags, 'genre');
    const themes = filterTags(tags, 'theme');
    const formats = filterTags(tags, 'format');

    return [
        {name: 'Author', values: author}, 
        {name: 'Artist', values: artist}, 
        {name: 'Genres', values: genres}, 
        {name: 'Themes', values: themes}, 
        {name: 'Demographic', values: demographic}, 
        {name: 'Format', values: formats},
        {name: 'Read or Buy', values: readOrBuy}, 
        {name: 'Track', values: track}
    ]
} 