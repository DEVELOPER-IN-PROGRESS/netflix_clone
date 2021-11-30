import jwt from "jsonwebtoken";
import { magicAdmin } from "../../lib/magic"; 

export default async function login(req, res){
    if(req.method ==='POST'){
        try{
            const auth = req.headers.authorization ; 
            const didtoken = auth ? auth.substr(7) : 'pooy' ; 
            console.log({didtoken})

            const metadata = await magicAdmin.users.getMetadataByToken(didtoken) ;
            console.log({metadata})

            // generate jwt token 
            const token = jwt.sign(
                  {   ...metadata ,
                    "iat": Math.floor( Date.now()/1000 ),
                    "exp": Math.floor( Date.now()/1000 + 24*7*3600 ),
                    "https://hasura.io/jwt/claims": {
                      "x-hasura-allowed-roles": ["admin","user"],
                      "x-hasura-default-role": "user",
                      "x-hasura-user-id": `${metadata.issuer}`
                    }
                  },process.env.HASURA_JWT_SECRET
            ); 
                  console.log({token})

            res.send({ done: true })
        }
        catch(err){
            res.status(500).send({ done: false })
            console.error("something wrong ", {err})
        }
    }else{
        res.send({ done: false })
    }
}