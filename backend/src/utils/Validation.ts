import * as yup from 'yup';
import {validateBufferMIMEType} from "validate-image-type";
import * as mongoose from "mongoose";

export const imageSchema = yup.mixed<Express.Multer.File>().test(
    'is-image',
    'File must be an image',
    async (file) => {
        if (!file) return true
        const isImage = await validateBufferMIMEType(file.buffer, {
            allowMimeTypes: ['image/jpeg', 'image/png']
        })
        return isImage.ok
    }
)

export const mongoIdSchema = yup.string().test(
    'is-mongo-id',
    "${path} is not a valid mongo Object Id",
    id => !id || mongoose.Types.ObjectId.isValid(id)
)