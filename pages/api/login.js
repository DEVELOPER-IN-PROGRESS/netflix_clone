export default async function login(req, res){
    if(req.method ==='POST'){
        try{
            const auth = req.headers.authorization ; 
            const token = auth ? auth.substr(7) : 'pooy' ; 
            console.log({token})
            res.send({ done: true })
        }catch(err){
            res.status(500).send({ done: false })
            console.error("something wrong ", {err})
        }
    }else{
        res.send({ done: false })
    }
}