import {Box} from "@mui/material";
import MarkdownEditor from "@/components/screenComponents/MarkdownEditor";
import styles from "@/styles/CreateBlogPage.module.css"
import {useForm} from "react-hook-form";
import BlogMetaSection from "@/components/screenComponents/createBlog/BlogMetaSection";
import {useEffect, useState} from "react";
import {getAllTags} from "@/data/dataSources/TagDataSource";

interface CreateNewBlogPageProps {

}

interface BlogInput {
    title: string,
    description: string,
    content: string
}

const CreateNewBlogPage = ({}: CreateNewBlogPageProps) => {

    const {control, handleSubmit, formState: {isSubmitting}} = useForm<BlogInput>()
    const [tags, setTags] = useState<Tag[]>([])

    useEffect(() => {
        async function fetchTags() {
            const tags = await getAllTags()
            setTags(tags)
            console.log(JSON.stringify(tags))
        }
        fetchTags()
    }, [])

    const onSubmit = (data: BlogInput) => {
        alert(JSON.stringify(data))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Box
                height="100vh"
                padding={2}
                display="flex"
                gap={2}
                sx={{overflowX: "hidden"}}
                alignItems="flex-start"
            >

                <Box
                    flex={0.4}
                    height="100%"
                    position="static"
                >
                    <BlogMetaSection tags={tags} control={control} isSubmitting={isSubmitting}/>

                </Box>

                <Box flex={1} height="100%">

                    <MarkdownEditor
                        placeholder="Write your blog here..."
                        className={styles.editor}/>

                </Box>

            </Box>


        </form>

    )
}

export default CreateNewBlogPage;
