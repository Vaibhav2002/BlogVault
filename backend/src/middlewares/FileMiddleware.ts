import multer from "multer";
import createHttpError from "http-errors";

enum FileType {
    PNG = "image/png",
    JPEG = "image/jpeg",
}

export const coverImageMiddleware = multer({
    limits: {
        fileSize: 5 * 1024 * 1024, //5MB limit
    },
    fileFilter(req, file, callback) {
        if (file.mimetype === FileType.PNG || file.mimetype === FileType.JPEG)
            callback(null, true)
        else
            callback(createHttpError(400, "File must be a png or jpeg"))
    }
})

export const profilePic = multer({
    limits: {
        fileSize: 5 * 1024 * 1024, //5MB limit
    },
    fileFilter(req, file, callback) {
        if (file.mimetype === FileType.PNG || file.mimetype === FileType.JPEG)
            callback(null, true)
        else
            callback(createHttpError(400, "File must be a png or jpeg"))
    }
})