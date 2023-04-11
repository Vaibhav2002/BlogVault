import {Box} from "@mui/material";
import MarkdownEditor from "@/components/form/MarkdownEditor";
import styles from "@/styles/CreateBlogPage.module.css"
import {useForm} from "react-hook-form";
import BlogMetaSection from "@/components/screenComponents/createBlog/BlogMetaSection";
import {useEffect, useState} from "react";
import {getAllTags} from "@/data/dataSources/TagDataSource";
import {BlogData, createBlog} from "@/data/dataSources/BlogDataSource";

export interface BlogInput {
    title: string,
    description: string,
    content: string,

    slug: string,

    tags: Tag[]
}

const CreateNewBlogPage = () => {

    const form = useForm<BlogInput>()

    const {handleSubmit, register, watch, setValue, formState: {errors}} = form

    const [tags, setTags] = useState<Tag[]>([])

    const [error, setError] = useState<string | undefined>()

    useEffect(() => {
        async function fetchTags() {
            const tags = await getAllTags()
            setTags(tags)
            console.log(JSON.stringify(tags))
        }
        fetchTags()
    }, [])

    const onSubmit = async (data: BlogInput) => {
        try {
            await createBlog({
                title: data.title,
                description: data.description,
                content: data.content,
                slug: data.slug,
                tags: data.tags ? data.tags.map(tag => tag._id) : []
            } as BlogData)
            setError(undefined)
        } catch (e) {
            console.error(e)
            if(e instanceof Error)
                setError(e.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Box
                height="100vh"
                padding={2}
                display="flex"
                gap={2}
                sx={{overflowX: "hidden", flexDirection: {xs: "column", md: "row"}}}
                alignItems="flex-start"
            >

                <Box
                    position="static"
                    flex={0.4}
                    sx={{height: {xs: "auto", md: "100%"}}}
                >
                    <BlogMetaSection tags={tags} form={form} error={error}/>

                </Box>

                <MarkdownEditor
                    register={register('content', {required: "Blog content is required"})}
                    error={errors.content}
                    value={watch('content')}
                    setValue={setValue}
                    placeholder="Write your blog here..."
                    className={styles.editor}/>
            </Box>

        </form>

    )
}

export default CreateNewBlogPage;
