import prisma from "./index.js"
export const createTweet = (tweetData) => {
    return prisma.tweet.create({
        data:tweetData
    })
}

export const getTweets = (params) => {
    console.log('params = getwet ',params)
    return prisma.tweet.findMany({
     ...params
    })
}

export const getTweetById = (tweetId, params = {}) => {
    return prisma.tweet.findUnique({
        ...params,
        where: {
            ...params.where,
            id: tweetId
        },
    })
}