import * as yup from "yup";
import {requiredStringSchema, slugSchema} from "@/utils/Validation";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import useSWR from "swr";
import {getAllTopics} from "@/data/dataSources/TopicDataSource";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getBlogRoute} from "@/utils/Routes";
import {Box} from "@mui/material";
import MarkdownEditor from "@/components/form/MarkdownEditor";
import styles from "@/styles/CreateBlogPage.module.css";
import BlogMetaSection from "@/components/BlogMetaSection";
import Blog from "@/data/models/Blog";
import {GetServerSideProps} from "next";
import {getBlogBySlug, updateBlog} from "@/data/dataSources/BlogDataSource";

export const getServerSideProps:GetServerSideProps<EditBlogPageProps> = async ({params}) => {
    const slug = params?.slug?.toString()
    if(!slug) throw new Error("Slug is required")

    const blog = await getBlogBySlug(slug)
    return {
        props: {blog}
    }
}


const updateBlogSchema = yup.object({
    title: requiredStringSchema.max(100, "Title cannot be more than 100 characters"),
    description: requiredStringSchema.max(300, "Description cannot be more than 300 characters"),
    slug: slugSchema.concat(requiredStringSchema).max(100, "Slug cannot be more than 100 characters"),
    content: requiredStringSchema.required('Blog Content is required'),
    topics: yup.array()
        .min(1, "At least one topic is required")
        .max(3, 'At most 3 topics are allowed')
        .required("Topics are required"),
    coverImage: yup.mixed<File>()

})

export type BlogInput = yup.InferType<typeof updateBlogSchema>

interface EditBlogPageProps{
    blog: Blog
}

const EditBlogPage = ({blog}:EditBlogPageProps) => {

    const form = useForm<BlogInput>({
        defaultValues: {
            title: blog.title,
            description: blog.description,
            slug: blog.slug,
            content: blog.content,
            topics: blog.topics,
        },
        resolver: yupResolver(updateBlogSchema)
    })
    const {handleSubmit, register, watch, setValue, formState: {errors}} = form

    const {data: topics, error: topicError} = useSWR('topics', getAllTopics)

    const [error, setError] = useState<string | undefined>()

    const router = useRouter()

    useEffect(() => {
        setError(topicError?.message)
    }, [topicError]);

    const onSubmit = async (data: BlogInput) => {
        try {
            console.log(JSON.stringify(data.topics))
            setError(undefined)
            await updateBlog(blog._id, {
                ...data,
                topics: data.topics.map(topic => topic._id) ?? []
            })
            await router.push(getBlogRoute(data.slug))
        } catch (e) {
            console.error(e)
            if (e instanceof Error)
                setError(e.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Box
                padding={2}
                display="flex"
                gap={2}
                sx={{overflowX: "hidden", flexDirection: {xs: "column", md: "row"}}}
                alignItems="stretch"
            >

                <Box
                    position="static"
                    flex={0.4}
                    sx={{height: {xs: "auto", md: "100%"}}}
                >
                    <BlogMetaSection topics={topics || []} form={form} error={error} coverImage={blog.coverImage} isForUpdate/>

                </Box>

                <MarkdownEditor
                    register={register('content')}
                    error={errors.content}
                    value={watch('content')}
                    setValue={setValue}
                    placeholder="Write your blog here..."
                    className={styles.editor}
                />

            </Box>

        </form>

    )
}

export default EditBlogPage;