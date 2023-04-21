import dynamic from "next/dynamic";
import React from 'react';
import ReactMarkdown from "react-markdown";
import {FieldError, UseFormRegisterReturn, UseFormSetValue} from "react-hook-form";
import Markdown from "@/components/Markdown";


const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false,
});


interface MdEditorProps {
    register: UseFormRegisterReturn
    value?: string
    setValue: UseFormSetValue<any>
    placeholder?: string,
    error?: FieldError
    className?: string
}

const MarkdownEditor = ({register, value, setValue, placeholder, error, className}: MdEditorProps) => {
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
        />
    )
}

export default MarkdownEditor;
