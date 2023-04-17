import sharp from "sharp";
import env from "../utils/CleanEnv";

const COVER_IMAGE_WIDTH = 1920
const COVER_IMAGE_HEIGHT = 1080

const POSTER_IMAGE_WIDTH = 512
const POSTER_IMAGE_HEIGHT = 512

export async function saveCoverImage(image: Express.Multer.File, filename: string): Promise<String> {
    const filePath = `/uploads/coverImages/${filename}.png`
    await saveImage(
        image,
        COVER_IMAGE_WIDTH,
        COVER_IMAGE_HEIGHT,
        `.${filePath}`
    )
    return env.SERVER_URL+filePath
}

export async function savePosterImage(image: Express.Multer.File, filename: string): Promise<String>{
    const filePath = `/uploads/posterImages/${filename}.png`
    await saveImage(
        image,
        POSTER_IMAGE_WIDTH,
        POSTER_IMAGE_HEIGHT,
        `.${filePath}`
    )
    return env.SERVER_URL+filePath
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