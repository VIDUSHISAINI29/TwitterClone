import { removeRefreshToken } from "../../db/refreshTokens.js"
import { sendRefreshToken } from "../../utils/jwt.js"
import {readBody} from "h3"
export default defineEventHandler(async (event) => {
    try {
        const cookies = readBody(event)
        const refreshToken = cookies.refresh_token
        await removeRefreshToken(refreshToken)
    } catch (error) {
        console.log("error in logout.post.js = ", error)
     }
    sendRefreshToken(event, null)

    return { message: 'Done' }
})