import prisma from "./index.js"
export const createTweet = (tweetData) => {
    return prisma.tweet.create({
        data:tweetData
    })
}