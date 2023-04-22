import * as yup from 'yup';
import {validateBufferMIMEType} from "validate-image-type";

export const imageSchema = yup.mixed<Express.Multer.File>().test(
    'is-image',
    'File must be an image',
    async (file) => {
        if(!file) return true
        const isImage = await validateBufferMIMEType(file.buffer, {
            allowMimeTypes: ['image/jpeg', 'image/png']
        })
        return isImage.ok
    }
)