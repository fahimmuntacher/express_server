import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import config from "../config";

const auth = () => {
    return (req : Request, res : Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];
        console.log({authtoken : token});
        if(!token){
            return res.status(404).json({
                message : "You're not allow"
            })
        }

        const tokenDecode = jwt.verify(token, config.jwt_secret as string)
        console.log(tokenDecode);
        next()
    }
}

export default auth;