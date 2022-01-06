import videoDummyData from '../data/videos.json'

const fetchVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const BASE_URL = "youtube.googleapis.com/youtube/v3";

  const response = await fetch(
    `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
  );

  return await response.json()

}

export const getCommonVideos = async (url) => {

   try{
    const  data =  videoDummyData ;// await fetchVideos(url) ;

 if(data?.error){
   //let data = videoDummyData;
     console.error('youtube api error ' , data.error)
     return [] ;
 }

    return data.items.map( (item) =>{
        const id =item.id?.videoId || item.id  ;

        const snippet = item.snippet ;
        return {
            title: snippet?.title,
            imgUrl: snippet.thumbnails.high.url,
            id ,
            description : snippet.description ,
            publishTime : snippet.publishedAt ,
            channelTitle: snippet.channelTitle ,
            statistics : item.statistics ?
                          item.statistics : { viewCount : 0 } ,

        }
    });
  } catch(error){
      console.error({error});
      return [] ;
  }
}

export const getVideos = async (searchQuery) => {
    const URL=`search?part=snippet&maxResults=25&q=${searchQuery}&type=video`

    return getCommonVideos(URL) ;
}


export const getPopularVideos = () => {
    const URL =
      "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";

     return getCommonVideos(URL);
  };

  export const getYoutubeVideoById = (videoId) => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;

    return getCommonVideos(URL);
  };

  // getPopularVideos, getVideos

  export const getWatchItAgainVideos = async (userId, token) => {
    const videos = await getWatchedVideos(userId, token);
    return videos?.map((video) => {
      return {
        id: video.videoId,
        imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
      };
    });
  };

  export const getMyList = async (userId, token) => {
    const videos = await getMyListVideos(userId, token);
    return videos?.map((video) => {
      return {
        id: video.videoId,
        imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
      };
    });
  };
