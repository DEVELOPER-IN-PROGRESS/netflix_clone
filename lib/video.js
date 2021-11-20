import vdata from '../data/videos.json'

console.log({vdata})

export const getVideos = async (searchQuery) => {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    const BASE_URL = "youtube.googleapis.com/youtube/v3";
  
    const response = await fetch(
        `https://${BASE_URL}/search?part=snippet&maxResults=25&q=${searchQuery}&key=${YOUTUBE_API_KEY}`
      );

   
const data = await response.json();

 
    return data.items.map( (item) =>{
        return {
            title: item.snippet.title,
            imgUrl: item.snippet.thumbnails.high.url,
            id: item?.id?.videoId , 
        }
    });
}