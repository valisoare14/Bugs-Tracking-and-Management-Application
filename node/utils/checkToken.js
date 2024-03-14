const jsonWebToken=require('jsonwebtoken')
const handleError = require('./handleError')

const checkToken=(req,res,next)=>{
    const bearerHeader=req.headers['authorization']
    const token = bearerHeader?.split(' ')[1]

    if(!token){
        return handleError(res,null,'No token provided')
    }

    jsonWebToken.verify(token,process.env.SECRET_KEY ,(error,decoded)=>{
        if(error){
            return handleError(res,error,'Invalid token')
        }

        //daca verificarea tokenului s-a realizat cu succes
        //variabila 'decoded' va contine incarcatura(payload-ul) token-ului
        req.studentId=decoded.id 
        next()
    })
}

module.exports = checkToken