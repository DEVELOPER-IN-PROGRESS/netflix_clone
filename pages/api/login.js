import jwt from "jsonwebtoken";
import { setTokenCookie } from "../../lib/cookies";
import { isNewUser ,createNewUser } from "../../lib/db/hasura";
import { magicAdmin } from "../../lib/magic";

export default async function login(req, res){
    if(req.method ==='POST'){
        try{
            const auth = req.headers.authorization ;
            const didtoken = auth ? auth.substr(7) : '' ;

            const metadata = await magicAdmin.users.getMetadataByToken(didtoken) ;

            // if this key is present  we generate invalid Bearer token
            delete metadata.oauthProvider ;
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
                 const isNewUserQuery = await   isNewUser(metadata.issuer , token);

                 isNewUserQuery && (await createNewUser(token , metadata ));
                 const cookie = setTokenCookie(token ,res);
                 console.log({cookie}) ;
                 res.send ({ done:true });
        }
        catch(err){
            res.status(500).send({ done: false })
            console.error("something wrong ", {err})
        }
    }else{
        res.send({ done: false })
    }
}