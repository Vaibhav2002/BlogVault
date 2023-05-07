import dynamic from "next/dynamic";
import React from 'react';
import {FieldError, UseFormRegisterReturn, UseFormSetValue} from "react-hook-form";
import Markdown from "@/components/Markdown";
import {uploadInBlogImage} from "@/data/dataSources/BlogDataSource";
import {HttpError} from "@/data/HttpErrors";


const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false,
});


interface MdEditorProps {
    register: UseFormRegisterReturn
    value?: string
    setValue: UseFormSetValue<any>
    placeholder?: string,
    error?: FieldError
    className?: string,
    onError?: (error: string) => void
}

const MarkdownEditor = ({register, value, setValue, placeholder, error, onError, className}: MdEditorProps) => {

    const uploadImage = async (image: File) => {
        try {
            const response = await uploadInBlogImage(image)
            return response.url
        } catch (e) {
            console.error(e)
            if (e instanceof HttpError)
                onError ? onError(e.message) : alert(e)
            else alert(e)
        }
    }

    return (
        <MdEditor
            {...register}
            id={register.name}
            name={register.name}
            className={`${error ? "is-invalid" : ""}  ${className}`}
            value={value}
            onChange={({text}) => setValue(register.name, text, {shouldValidate: true, shouldDirty: true})}
            renderHTML={text => <Markdown>{text}</Markdown>}
            placeholder={placeholder}
            view={{html: false, menu: true, md: true}}
            onImageUpload={uploadImage}
            imageAccept='.png,.jpeg,.jpg'
        />
    )
}

export default MarkdownEditor;
