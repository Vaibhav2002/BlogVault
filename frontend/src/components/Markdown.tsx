import React, {ReactNode} from 'react';
import ReactMarkdown from "react-markdown";
import {List, ListItem, Typography, useTheme} from "@mui/material";
import rehypeRaw from "rehype-raw";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import useDevices from "@/hooks/useDevices";
import {Variant} from "@mui/material/styles/createTypography";
import Link from "@mui/material/Link";
import {github} from "react-syntax-highlighter/dist/esm/styles/hljs";

interface MarkdownProps {
    children: string
    className?: string
}

interface Sizes {
    h1: Variant
    h2: Variant
    h3: Variant
    h4: Variant
    h5: Variant
    h6: Variant
}

const Markdown = ({children, className}: MarkdownProps) => {
    const palette = useTheme().palette
    const markdown = children.replace("\\n", "&nbsp; \\n")
    const {isMobile} = useDevices()

    const Spaced = (children: ReactNode) => (
        <>
            <br/>
            {children}
        </>
    )

    const sizes = {
        h1: isMobile ? 'h5' : 'h4',
        h2: isMobile ? 'h6' : 'h5',
        h3: isMobile ? 'subtitle1' : 'h6',
        h4: isMobile ? 'subtitle2' : 'subtitle1',
        h5: isMobile ? 'body1' : 'subtitle2',
        h6: isMobile ? 'body1' : 'button',
    } as Sizes

    return (
        <ReactMarkdown
            className={className}
            remarkPlugins={[remarkGfm, [remarkToc, {compact: true, maxDepth: 3}]]}
            rehypePlugins={[rehypeRaw, rehypeSlug]}
            components={{
                h1: ({...props}) => Spaced(<Typography {...props} fontWeight="bolder" variant={sizes.h1}/>),
                h2: ({...props}) => Spaced(<Typography {...props} variant={sizes.h2} fontWeight="bolder"/>),
                h3: ({...props}) => Spaced(<Typography {...props} variant={sizes.h3} fontWeight="bolder"/>),
                h4: ({...props}) => Spaced(<Typography {...props} variant={sizes.h4} fontWeight="bolder"/>),
                h5: ({...props}) => Spaced(<Typography {...props} variant={sizes.h5} fontWeight="bold"
                                                       color='text.secondary'/>),
                h6: ({...props}) => Spaced(<Typography {...props} variant={sizes.h6} fontWeight="bold"
                                                       color='text.secondary'/>),
                p: ({...props}) => <Typography {...props} variant="body1"/>,
                span: ({...props}) => <Typography {...props} variant="body1"/>,

                code: ({inline, className, children, ...props}) => {
                    const match = /language-(\w+)/.exec(className || '')
                    if (!inline && match)
                        return <SyntaxHighlighter
                            {...props}
                            children={String(children).replace(/\n$/, '')}
                            style={github}
                            language={match[1]}
                            PreTag="div"
                        />
                    else if (!inline)
                        return <SyntaxHighlighter
                            {...props}
                            children={String(children).replace(/\n$/, '')}
                            style={github}
                            language='markdown'
                            PreTag="div"
                        />
                    else
                        return <code className={className} {...props}
                                     style={{backgroundColor: palette.background.paper}}/>
                },

                ul: ({...props}) => <List {...props} sx={{listStyleType: 'disc', pl: 4}}/>,
                li: ({...props}) => <ListItem {...props} sx={{display: 'list-item', paddingY: 0.25}}/>,

                img: ({node, ...props}) =>
                    <span style={{display: 'inline-flex', justifyContent: 'center', flexDirection: 'row'}}>
                        <img style={{maxWidth: '100%'}} {...props}/>
                    </span>,

                a: ({...props}) => (<Link {...props} color="primary.main" underline="always" fontWeight='600'/>)

            }}
        >
            {markdown}
        </ReactMarkdown>
    )
}

export default Markdown;
