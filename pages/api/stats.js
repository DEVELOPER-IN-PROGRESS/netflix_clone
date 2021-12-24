import { verifyToken } from "../../lib/utils";

export default async function(req, res){
    if( req.method === 'POST'){
        try{
            const token = req.cookies.token ;
            if(!req.cookies.token){
            res.status(403).send({})
        }else{
            const decoded = jwt.verify(token, process.env.HASURA_JWT_SECRET)
            console.log({decoded})
         res.send({ msg: 'It Works' , decoded}) ;
        }
      }catch(error){
          console.error('Error Occured /stats' , error );
          res.status(500).send( { done:false , error : error?.message });
      }
    }
}