import sharp from "sharp";
import env from "../utils/CleanEnv";

const COVER_IMAGE_WIDTH = 800
const COVER_IMAGE_HEIGHT = 600

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