import { getTweets } from "~~/server/db/tweets"
import { tweetTransformer } from "~~/server/transformers/tweet"
import {sendError, getQuery} from "h3"

export default defineEventHandler(async (event) => {
    console.log("Full Query Params: ", getQuery(event)); // ✅ Log everything

    const { query } = getQuery(event) || {}; // Fallback to empty object

    console.log("Extracted query: ", query); // ✅ Log extracted query

    
    if(!query){
    return sendError(event, createError({
        statusCode: 401,
        statusMessage: "no queSry there"
    }))
}

    let primsaQuery = {
        include: {
            author: true,
            mediaFiles: true,
            replies: {
                include: {
                    author: true
                }
            },
            replyTo: {
                include: {
                    author: true
                }
            }
        },
        orderBy: [
            {
                createdAt: 'desc'
            }
        ]
    }

    if (query) {
        primsaQuery = {
            ...primsaQuery,
            where: {
                text: {
                    contains: "twweet"
                }
            }
        }
    }

    const tweets = await getTweets(primsaQuery)


    return {
        tweets: tweets.map(tweetTransformer)
        // tweets:  "twer"
    }
})