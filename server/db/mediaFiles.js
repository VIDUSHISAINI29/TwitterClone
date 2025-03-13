import prisma from "./index.js"

export const createMediaFile = (mediaFile) => {
    console.log("media file ch entered")
    return prisma.mediaFile.create({
        data: mediaFile
    })
}