import formidable from "formidable";
import { createTweet } from "~/server/db/tweets.js";
import { createMediaFile } from "../../../db/mediaFiles.js";
import { tweetTransformer } from "../../../transformers/tweet.js";
import { uploadToCloudinary } from "../../../utils/cloudinary.js";

export default defineEventHandler(async (event) => {
    try {
        // Initialize formidable for file parsing
        const form = formidable({ multiples: true });

        // Parse form data
        const response = await new Promise((resolve, reject) => {
            form.parse(event.req, (err, fields, files) => {
                if (err) {
                    console.error("Error parsing form:", err);
                    return reject(new Error("Failed to parse form data"));
                }
                resolve({ fields, files });
            });
        });

        const { fields, files } = response;
        const userId = event.context?.auth?.user?.id;

        if (!userId) {
            throw new Error("Unauthorized: User ID not found");
        }

        // Ensure text exists
        const tweetText = fields.text?.[0] || "";
        if (!tweetText.trim()) {
            throw new Error("Tweet text is required");
        }

        // Prepare tweet data
        const tweetData = {
            text: tweetText,
            authorId: userId,
        };

        // Check if it's a reply
        const replyTo = fields.replyTo?.[0];
        if (replyTo && replyTo !== "null" && replyTo !== "undefined") {
            tweetData.replyToId = replyTo;
        }

        console.log("Creating tweet:", tweetData);
        const tweet = await createTweet(tweetData);

        // Process media files
        let uploadedFiles = [];
        if (files && Object.keys(files).length > 0) {
            console.log("Uploading files...");
            const filePromises = Object.keys(files).map(async (key) => {
                const file = files[key][0]; // Access the first file
                if (!file?.filepath) {
                    throw new Error("Invalid file format");
                }

                // Upload to Cloudinary
                const cloudinaryResource = await uploadToCloudinary(file.filepath);

                // Store media file details in DB
                return createMediaFile({
                    url: cloudinaryResource.secure_url,
                    providerPublicId: cloudinaryResource.public_id,
                    userId: userId,
                    tweetId: tweet.id,
                });
            });

            uploadedFiles = await Promise.all(filePromises);
        }

        return {
            tweet: tweetTransformer(tweet),
            mediaFiles: uploadedFiles, // Return media details if any
        };
    } catch (error) {
        console.error("Error in tweet creation:", error);
        return {
            statusCode: 500,
            message: error.message || "Internal Server Error",
        };
    }
});
