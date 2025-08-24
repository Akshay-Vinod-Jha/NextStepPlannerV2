import JWT from "jsonwebtoken";

const secret = "$Black@Panther_CB98";

export function  createTokenForUser(user){
    const payload = {
        userId : user._id,
        role : user.role,
    }

    const token = JWT.sign(payload , secret);
    return token ;
}

export function validateToken(token){
    const payload = JWT.verify(token , secret);
    return payload;
}