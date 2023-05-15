import * as yup from "yup";
import {requiredStringSchema, slugSchema} from "@/utils/Validation";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import useSWR from "swr";
import {getAllTopics} from "@/data/dataSources/TopicDataSource";
import React, {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";
import Routes, {getBlogRoute} from "@/utils/Routes";
import {Box, CircularProgress, Stack, Typography} from "@mui/material";
import MarkdownEditor from "@/components/form/MarkdownEditor";
import styles from "@/styles/CreateBlogPage.module.css";
import BlogMetaSection from "@/components/BlogMetaSection";
import Blog from "@/data/models/Blog";
import {GetServerSideProps} from "next";
import {deleteBlog, getBlogBySlug, updateBlog} from "@/data/dataSources/BlogDataSource";
import useUnsavedChangesWarning from "@/hooks/useUnsavedChangesWarning";
import PrimaryButton from "@/components/styled/PrimaryButton";
import useDevices from "@/hooks/useDevices";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import CenteredBox from "@/components/styled/CenteredBox";

export const getServerSideProps: GetServerSideProps<EditBlogPageProps> = async ({params}) => {
    const slug = params?.slug?.toString()
    if (!slug) throw new Error("Slug is required")

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

interface EditBlogPageProps {
    blog: Blog
}

const EditBlogPage = ({blog}: EditBlogPageProps) => {
    const {user, userLoading} = useAuthenticatedUser()
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
    const {handleSubmit, register, watch, setValue, formState: {errors, isSubmitting, isDirty}} = form

    const {data: topics, error: topicError} = useSWR('topics', getAllTopics)

    const [error, setError] = useState<string | undefined>()

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter()

    const {isMobile} = useDevices()

    useUnsavedChangesWarning(isDirty && !isSubmitting && !isDeleting)

    useEffect(() => {
        setError(topicError?.message)
    }, [topicError]);

    const onSubmit = async (data: BlogInput) => {
        try {
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

    const onDeleteConfirmed = async () => {
        setShowDeleteConfirmation(false)
        setIsDeleting(true)
        try {
            await deleteBlog(blog._id)
            await router.push(Routes.Home)
        } catch (e) {
            setIsDeleting(false)
            console.error(e)
            if (e instanceof Error) setError(e.message)
        }
    }

    const buttonsEnabled = isSubmitting || isDeleting

    const submitButton = useMemo(() => (
        <PrimaryButton type="submit" variant="contained" disabled={buttonsEnabled}>Publish</PrimaryButton>
    ), [buttonsEnabled]);

    const deleteButton = useMemo(() => (
        <PrimaryButton variant="outlined" color="error" disabled={buttonsEnabled}
                       onClick={() => setShowDeleteConfirmation(true)}>
            Delete Blog
        </PrimaryButton>
    ), [buttonsEnabled])

    const isCurrentUserAuthor = user?._id === blog.author._id

    if (!isCurrentUserAuthor)
        return <CenteredBox height="100vh">
            <Typography variant="h4">You are not authorized to edit this blog</Typography>
        </CenteredBox>

    if (userLoading)
        return <CenteredBox height="100vh"><CircularProgress/></CenteredBox>

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Box
                padding={4}
                display="flex"
                gap={3}
                sx={{overflowX: "hidden", flexDirection: {xs: "column", md: "row"}}}
                alignItems="stretch"
            >

                <Stack
                    position="static"
                    flex={0.4}
                    direction='column'
                    spacing={2}
                >
                    <Typography variant="h4">Edit Blog</Typography>

                    <BlogMetaSection topics={topics || []} form={form} error={error} coverImage={blog.coverImage}/>

                    {!isMobile && submitButton}
                    {!isMobile && deleteButton}

                </Stack>

                <MarkdownEditor
                    register={register('content')}
                    error={errors.content}
                    value={watch('content')}
                    setValue={setValue}
                    placeholder="Write your blog here..."
                    className={styles.editor}
                    onError={setError}
                />

                {isMobile && submitButton}
                {isMobile && deleteButton}

            </Box>

            {showDeleteConfirmation &&
                <ConfirmationModal
                    open={showDeleteConfirmation}
                    title="Delete blog?"
                    message="Are you sure that you want to delete this blog? This action cannot be undone."
                    onPositiveClick={onDeleteConfirmed}
                    onNegativeClick={() => setShowDeleteConfirmation(false)}
                />
            }

        </form>

    )
}

export default EditBlogPage;