import { validateToken } from "../Services/authentication.js";

export async function getTokenDetails(req,res){
    const token = req.cookies["token"];
    if(!token)
    {
        return res.status(401).json({error : "User is not Authenticated!!!" , role : null});
    }
    try{
            const userPayload = validateToken(token);
            req.user = userPayload;
            console.log(userPayload);
            
            // Fetch user details from database to get email and name
            const User = (await import('../Models/user.js')).default;
            const user = await User.findById(userPayload.userId).select('name email role').lean();
            
            if (!user) {
                return res.status(404).json({error: "User not found!"});
            }
            
            return res.status(200).json({
                msg: "Success", 
                role: user.role,
                email: user.email,
                name: user.name,
                userId: userPayload.userId
            });
        }catch(error)
        {
            console.log("Error in middleware while checking token!",error);
            return res.status(401).json({error : "Error Occured in accessing tokem details!", role: null});
        }
}

