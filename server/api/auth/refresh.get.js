import { sendError, getCookie } from "h3"
import { getRefreshTokenByToken } from "../../db/refreshTokens.js"
import { decodeRefreshToken, generateTokens } from "../../utils/jwt.js"
import { getUserById } from "../../db/users.js"
import { ref } from "vue";

export default defineEventHandler(async (event) => {
    const refreshToken = getCookie(event, "refresh_token")
// console.log("ref = ", refreshToken);

    if (!refreshToken) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid'
        }))
    }

    const rToken = await getRefreshTokenByToken(refreshToken)

    if (!rToken) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid'
        }))
    }

    const token = decodeRefreshToken(refreshToken)
// console.log("decoded token ")
    try {
        const user = await getUserById(token.userId)

        const { accessToken } = generateTokens(user)

        return { access_token: accessToken }
        // console.log("comp token");
        

    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        }))
    }
});