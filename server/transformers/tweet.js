import { mediaFileTransformer } from "./mediaFiles"
import { userTransformer } from "./user"
import human from "human-time"

export const tweetTransformer = (tweet) => {
    // if(!!tweet.mediaFiles){
    //     console.log("media = ", tweet.mediaFiles);
    // }
    // if(!!tweet.author){
    //     console.log("author = ", tweet.author);
    // }
    
    return {
        id: tweet.id,
        text: tweet.text,
        mediaFiles: !!tweet.mediaFiles ? tweet.mediaFiles.map(mediaFileTransformer) : [],
        author: !!tweet.author ? userTransformer(tweet.author) : null,
        replies: !!tweet.replies ? tweet.replies.map(tweetTransformer) : [],
        replyTo: !!tweet.replyTo ? tweetTransformer(tweet.replyTo) : null,
        repliesCount: !!tweet.replies ? tweet.replies.length : 0,
        postedAtHuman: human(tweet.createdAt)
    }
}