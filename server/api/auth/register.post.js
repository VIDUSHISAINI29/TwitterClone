import { sendError } from "h3"
import {createUser} from "../../db/users.js"
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {username, email, password, repeatPassword, name, profileImage} = body
    if(!username || !email || !password || !repeatPassword || !name ){
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid params'
        }))
    }
    if(password !== repeatPassword){
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: "Password do not match"
        }))
    }
    const userData = {
        username,
        email,
        name,
        password,
        profileImage
       
    }
    console.log("register")
    const user = await createUser(userData)
    return{
        body: user
    }
})