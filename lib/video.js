import vdata from '../data/videos.json'

console.log({vdata})

export const getVideos = () => {
    return vdata.items.map( (item) =>{
        return {
            title: item.snippet.title,
            imgUrl: item.snippet.thumbnails.high.url,
            id: item?.id?.videoId , 
        }
    });
}