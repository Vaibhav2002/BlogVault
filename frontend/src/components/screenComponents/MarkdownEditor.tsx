import dynamic from "next/dynamic";
import React from 'react';
import ReactMarkdown from "react-markdown";


const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false,
});


interface MdEditorProps {
    placeholder?:string,
    className?:string
}

const MarkdownEditor = ({placeholder, className}: MdEditorProps) => {
    return (
        <MdEditor
            className={className}
            renderHTML={text => <ReactMarkdown>{text}</ReactMarkdown>}
            placeholder={placeholder}
            view={{html: false, menu: true, md: true}}
        />
    )
}

export default MarkdownEditor;
