import { validateToken } from "../Services/authentication.js";

export function checkForAuthenticationCookieForAdmin(cookieName){
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
            if(userPayload && userPayload.role !== 'admin') {
                return res.status(403).json({ error: "Access denied. Admins only." });
            }   

        }catch(error)
        {
            console.log("Error in middleware while checking token!",error);
        }
        next();
    }
}