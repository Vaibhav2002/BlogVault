import React from 'react';
import ReactMarkdown from "react-markdown";
import {Typography} from "@mui/material";
import rehypeRaw from "rehype-raw";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {oneDark} from "react-syntax-highlighter/dist/cjs/styles/prism";

interface MarkdownProps {
    children: string
    className?: string
}

const Markdown = ({children, className}: MarkdownProps) => {
    return (
        <ReactMarkdown
            className={className}
            rehypePlugins={[rehypeRaw]}
            components={{
                h1: ({node, ...props}) => <Typography {...props} variant="h4" fontStyle="bold"/>,
                h2: ({node, ...props}) => <Typography {...props} variant="h5" fontStyle="bold"/>,
                h3: ({node, ...props}) => <Typography {...props} variant="h6" fontStyle="bold"/>,
                h4: ({node, ...props}) => <Typography {...props} variant="subtitle1"/>,
                h5: ({node, ...props}) => <Typography {...props} variant="subtitle2"/>,
                p: ({node, ...props}) => <Typography {...props} variant="body1"/>,
                span: ({node, ...props}) => <Typography {...props} variant="body1"/>,

                code: ({node, inline, className, children, ...props}) => {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                        <SyntaxHighlighter
                            {...props}
                            children={String(children).replace(/\n$/, '')}
                            style={oneDark}
                            language={match[1]}
                            PreTag="div"
                        />
                    ) : (
                        <code {...props} className={className}>{children}</code>
                    )
                },

                img: ({node, ...props}) =>
                    <img width="100%" style={{aspectRatio: `${props.width}/${props.height}`}} {...props}/>
            }}
        >
            {children}
        </ReactMarkdown>
    )
}

export default Markdown;
