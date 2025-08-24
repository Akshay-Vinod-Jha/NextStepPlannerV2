import mongoose from "mongoose";
import {createHmac , randomBytes} from "crypto"
import { createTokenForUser } from "../Services/authentication.js";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    googleId:{
        type : String,
    },
    password : {
        type : String,
    },
    salt : {
        type : String,
    },
    role :{
        type : String,
        enum : ['USER','ADMIN'],
        default : "USER",
        required : false,
    }
},{timestamps : true});


userSchema.pre("save",function(next)
{
    const user = this;
    if(!user.isModified("password"))
    {
        return next();
    }

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256",salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
})


userSchema.static("matchedUserAndGenerateToken",async function (email , password){
    const user = await this.findOne({email}).lean();      //it convert mongoose object to simple js object
    console.log(user);
    if(!user) 
    {
        return { error : "User Not Found!!"}
    }

    if(user.googleId)
    {
        const token = createTokenForUser(user);
        return {token : token , msg : "Sign In Succeeded", role : user.role};
    }


    const salt = user.salt;
    const hashedPassword = user.password;
    const UserProvidedHashedPassword = createHmac("sha256",salt).update(password).digest("hex");
    
    if(UserProvidedHashedPassword != hashedPassword)
    {
        return {error : "Password Incorrect"};
    }

    const token = createTokenForUser(user);
    return {token : token , msg : "Sign In Succeeded", role : user.role}; 
})



const User = mongoose.model("user",userSchema);

export default User;