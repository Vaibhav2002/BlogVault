import {Alert, Box, Collapse, Stack, Typography} from "@mui/material";
import MarkdownEditor from "@/components/form/MarkdownEditor";
import styles from "@/styles/CreateBlogPage.module.css"
import {useForm, UseFormReturn} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {getAllTopics} from "@/data/dataSources/TopicDataSource";
import {createBlog} from "@/data/dataSources/BlogDataSource";
import {useRouter} from "next/router";
import {getBlogRoute} from "@/utils/Routes";
import {requiredFileSchema, requiredStringSchema, slugSchema} from "@/utils/Validation";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {generateSlug} from "@/utils/Helpers";
import FormTextField from "@/components/form/FormTextField";
import FormImagePicker from "@/components/form/FormImagePicker";
import FormAutoComplete from "@/components/form/FormAutoComplete";
import PrimaryButton from "@/components/styled/PrimaryButton";
import useSWR from "swr";
import useFormImage from "@/hooks/useFormImage";
import placeholder from "@/assets/images/placeholder.png"
import Image from "next/image";


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
    const {handleSubmit, register, watch, setValue, formState: {errors}} = form

    const {data: topics, error: topicError} = useSWR('topics', getAllTopics)

    const [error, setError] = useState<string | undefined>()

    const router = useRouter()

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

interface BlogMetaSectionProps {
    topics: Topic[]
    form: UseFormReturn<BlogInput>
    error?: string
    className?: string
}

const BlogMetaSection = ({topics, form, error, className}: BlogMetaSectionProps) => {

    const {getValues, setValue, watch, formState: {errors, isSubmitting}} = form
    const {fileUrl: coverImageUrl} = useFormImage('coverImage', watch)


    const errorText = errors.content?.message ?? error

    const setSlug = () => {
        const title = getValues('title')
        const slug = generateSlug(title)
        setValue('slug', slug, {shouldValidate: true})
    }

    return (
        <Stack className={className} spacing={3}>

            <Typography variant="h4">Create New Blog</Typography>

            <Collapse in={!!errorText}>
                <Alert severity="error">{errorText}</Alert>
            </Collapse>

            <Stack spacing={3}>

                <Box>
                    <Box width={1} sx={{aspectRatio: "16/9"}} position="relative" marginBottom="1rem">
                        <Image src={coverImageUrl ?? placeholder} alt="Cover Image" fill style={{borderRadius: "0.5rem"}}/>
                    </Box>

                    <FormImagePicker control={form.control} name="coverImage" label="Blog Cover Image"/>
                </Box>

                <FormTextField
                    control={form.control}
                    name="title"
                    label="Title"
                    showLength
                    maxLength={100}
                    onBlur={setSlug}
                    placeholder="Enter title"
                />

                <FormTextField
                    control={form.control}
                    name="slug"
                    label="Slug"
                    showLength
                    maxLength={100}
                    placeholder="Enter slug"
                />

                <FormTextField
                    control={form.control}
                    name="description"
                    label="Description"
                    showLength
                    maxLength={300}
                    placeholder="Enter description"
                    maxRows={6}
                />

                <FormAutoComplete
                    control={form.control}
                    name="topics"
                    options={topics}
                    placeholder="Select Topics"
                    max={3}
                    getOptionLabel={(topic: Topic) => topic.name}
                />

                <PrimaryButton type="submit" variant="contained" disabled={isSubmitting}>
                    Publish
                </PrimaryButton>
            </Stack>

        </Stack>
    )
}

export default CreateNewBlogPage;
