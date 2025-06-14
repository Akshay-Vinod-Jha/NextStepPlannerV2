import { validateToken } from "../Services/authentication.js";

export function checkForAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        console.log("Token cookie value: ",tokenCookieValue);
        if(!tokenCookieValue)
        {
            return res.status(401).json({ error: "Authentication token missing" });
        }

        try{
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        }catch(error)
        {
            console.log("Error in middleware while checking token!",error);
        }
        next();
    }
}



