import multer from "multer";

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
            callback(new Error("File must be a png or jpeg"))
    }
})