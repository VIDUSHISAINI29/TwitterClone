import formidable from "formidable"
import { createTweet } from "~/server/db/tweets.js"
import { createMediaFile } from "../../../db/mediaFiles.js"
import { tweetTransformer } from "../../../transformers/tweet.js"
import {uploadToCloudinary} from "../../../utils/cloudinary.js"

export default defineEventHandler(async (event) => {
    
    const form = formidable({})

    const response = await  new Promise ((resolve, reject) => {
        form.parse(event.req,(err, fields, files) => {
            if(err){
                reject(err)
                console.log("rr in form pasre")
            }
            resolve({fields, files})
        })
    })

    const {fields, files} = response

    const userId = event.context?.auth?.user?.id
console.log('he = ',typeof(fields.text[0]))
    const tweetData = {
        text: fields.text[0],
        authorId : userId
    }

    const replyTo = fields.replyTo

    if(replyTo && replyTo !== 'null'){
        tweetData.replyToId = replyTo
    }

    const tweet = await createTweet(tweetData)

    const filePromises = Object.keys(files).map(async key => {
        const file = files[key]
        // console.log("file = ",file[0].filepath);
        
        const cloudinaryResource = await uploadToCloudinary(file[0].filepath)
console.log('resp = ',response);

        return createMediaFile({
            url: cloudinaryResource.secure_url,
            providerPublicId: cloudinaryResource.public_id,
            userId: userId,
            tweetId: tweet.id
        })
    })
    await Promise.all(filePromises)
    
    return{
        tweet: tweetTransformer(tweet) 
        // twwet: tweetData
        // files: files
    }
})