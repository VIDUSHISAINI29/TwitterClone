import { userTransformer } from "../../transformers/user.js"

export default defineEventHandler(async (event) => {

    return {
        user: userTransformer(event.context.auth?.user)
    }

})