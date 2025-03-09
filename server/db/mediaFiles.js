import prisma from "./index.js"

export const createMediaFile = (mediaFile) => {
    return prisma.mediaFile.create({
        data: mediaFile
    })
}