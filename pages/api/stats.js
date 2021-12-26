import {
    findVideoIdByUser,
    updateStats,
    insertStats,
  } from "../../lib/db/hasura";
import { verifyToken } from "../../lib/utils";

export default async function stats(req, res){
    if( req.method === 'POST'){
        try{
            const token = req.cookies.token ;
            if(!req.cookies.token){
            res.status(403).send({})
        }else {
            const inputParams = req.method === "POST" ? req.body : req.query;
            console.log({inputParams})
            const { videoId } = inputParams;
            if (videoId) {
              const userId = await verifyToken(token);
              console.log({userId})
              const findVideo = await findVideoIdByUser(token, userId, videoId);
              const doesStatsExist = findVideo?.length > 0;

              if (req.method === "POST") {
                const { favourited, watched = true } = req.body;
                if (doesStatsExist) {
                  // update it
                  const response = await updateStats(token, {
                    watched,
                    userId,
                    videoId,
                    favourited,
                  });
                  resp.send({ data: response });
                } else {
                  // add it
                  const response = await insertStats(token, {
                    watched,
                    userId,
                    videoId,
                    favourited,
                  });
                  resp.send({ data: response });
                }
              } else {
                if (doesStatsExist) {
                  resp.send(findVideo);
                } else {
                  resp.status(404);
                  resp.send({ user: null, msg: "Video not found" });
                }
              }
            }
        }
      }catch(error){
          console.error('Error Occured /stats' , error );
          res.status(500).send( { done:false , error : error?.message });
      }
    }
}