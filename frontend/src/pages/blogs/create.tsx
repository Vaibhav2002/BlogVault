import {Box} from "@mui/material";
import MarkdownEditor from "@/components/form/MarkdownEditor";
import styles from "@/styles/CreateBlogPage.module.css"
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {getAllTopics} from "@/data/dataSources/TopicDataSource";
import {createBlog} from "@/data/dataSources/BlogDataSource";
import {useRouter} from "next/router";
import {getBlogRoute} from "@/utils/Routes";
import {requiredFileSchema, requiredStringSchema, slugSchema} from "@/utils/Validation";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import useSWR from "swr";
import BlogMetaSection from "@/components/BlogMetaSection";
import useUnsavedChangesWarning from "@/hooks/useUnsavedChangesWarning";


const blogSchema = yup.object({
    title: requiredStringSchema.max(100, "Title cannot be more than 100 characters"),
    description: requiredStringSchema.max(300, "Description cannot be more than 300 characters"),
    slug: slugSchema.concat(requiredStringSchema).max(100, "Slug cannot be more than 100 characters"),
    content: requiredStringSchema.required('Blog Content is required'),
    topics: yup.array()
        .min(1, "At least one topic is required")
        .max(3, 'At most 3 topics are allowed')
        .required("Topics are required"),
    coverImage: requiredFileSchema

})

export type BlogInput = yup.InferType<typeof blogSchema>

const CreateNewBlogPage = () => {

    const form = useForm<BlogInput>({resolver: yupResolver(blogSchema)})
    const {handleSubmit, register, watch, setValue, formState: {errors, isSubmitting, isDirty}} = form

    const {data: topics, error: topicError} = useSWR('topics', getAllTopics)

    const [error, setError] = useState<string | undefined>()

    const router = useRouter()

    useUnsavedChangesWarning(isDirty && !isSubmitting)

    useEffect(() => {
        setError(topicError?.message)
    }, [topicError]);

    const onSubmit = async (data: BlogInput) => {
        try {
            setError(undefined)
            await createBlog({
                ...data,
                topics: data.topics.map(topic => topic._id) ?? [],
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
                    <BlogMetaSection topics={topics || []} form={form} error={error}/>

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

export default CreateNewBlogPage;
