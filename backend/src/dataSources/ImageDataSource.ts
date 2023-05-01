import sharp from "sharp";
import env from "../utils/CleanEnv";
import fs from "fs";

const COVER_IMAGE_WIDTH = 1280
const COVER_IMAGE_HEIGHT = 720

const POSTER_IMAGE_WIDTH = 512
const POSTER_IMAGE_HEIGHT = 512

const PROFILE_PIC_WIDTH = 256
const PROFILE_PIC_HEIGHT = 256

export async function saveCoverImage(image: Express.Multer.File, filename: string): Promise<string> {
    const filePath = `/uploads/coverImages/${filename}.png`
    await saveImage(
        image,
        COVER_IMAGE_WIDTH,
        COVER_IMAGE_HEIGHT,
        `.${filePath}`
    )
    return env.SERVER_URL + filePath
}

export async function savePosterImage(image: Express.Multer.File, filename: string): Promise<string> {
    const filePath = `/uploads/posterImages/${filename}.png`
    await saveImage(
        image,
        POSTER_IMAGE_WIDTH,
        POSTER_IMAGE_HEIGHT,
        `.${filePath}`
    )
    return env.SERVER_URL + filePath
}


export async function saveProfilePic(image: Express.Multer.File, filename: string): Promise<string> {
    const filePath = `/uploads/profilePics/${filename}.png`
    await saveImage(
        image,
        PROFILE_PIC_WIDTH,
        PROFILE_PIC_HEIGHT,
        `.${filePath}`
    )
    return env.SERVER_URL + filePath
}

export const removeImage = (url: string) => {
    const path = extractPathFromUrl(url)
    fs.unlinkSync('.' + path)
}


const extractPathFromUrl = (url: string) => {
    return url.split(env.SERVER_URL)[1].split("?")[0]
}

async function saveImage(
    image: Express.Multer.File,
    width: number,
    height: number,
    path: string
) {
    await sharp(image.buffer)
        .resize(width, height)
        .toFile(path)
}