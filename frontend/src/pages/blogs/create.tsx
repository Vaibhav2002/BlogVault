import {Box, CircularProgress, Stack, Theme, Typography, useMediaQuery} from "@mui/material";
import MarkdownEditor from "@/components/form/MarkdownEditor";
import styles from "@/styles/CreateBlogPage.module.css"
import {useForm} from "react-hook-form";
import React, {useEffect, useMemo, useState} from "react";
import {getAllTopics} from "@/data/dataSources/TopicDataSource";
import {createBlog} from "@/data/dataSources/BlogDataSource";
import {useRouter} from "next/router";
import Routes, {getBlogRoute} from "@/utils/Routes";
import {requiredFileSchema, requiredStringSchema, slugSchema} from "@/utils/Validation";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import useSWR from "swr";
import BlogMetaSection from "@/components/BlogMetaSection";
import useUnsavedChangesWarning from "@/hooks/useUnsavedChangesWarning";
import PrimaryButton from "@/components/styled/PrimaryButton";
import NavScreen from "@/components/NavScreen/NavScreen";
import {NavScreen as NavPage} from "@/components/navBars/NavOptions";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import CenteredBox from "@/components/styled/CenteredBox";
import {HttpError} from "@/data/HttpErrors";
import CreateTopicModal from "@/components/modals/CreateTopicModal";
import Head from "next/head";
import useTracker, {useLandedEvent} from "@/hooks/useTracker";
import Topic from "@/data/models/Topic";


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
    useLandedEvent()

    const {user, userLoading} = useAuthenticatedUser()
    const form = useForm<BlogInput>({resolver: yupResolver(blogSchema)})
    const {handleSubmit, register, watch, setValue, getValues, formState: {errors, isSubmitting, isDirty}} = form

    const {data: topics, error: topicError, mutate: mutateTopic} = useSWR('topics', getAllTopics)

    const [error, setError] = useState<string | undefined>()

    const router = useRouter()

    const isBelowSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
    const {blogCreate} = useTracker()

    useUnsavedChangesWarning(isDirty && !isSubmitting)

    useEffect(() => {
        setError(topicError?.message)
    }, [topicError]);

    const onSubmit = async (data: BlogInput) => {
        try {
            setError(undefined)
            const blog = await createBlog({
                ...data,
                topics: data.topics.map(topic => topic._id) ?? [],
            })
            blogCreate(blog)
            await router.replace(getBlogRoute(data.slug))
        } catch (e) {
            console.error(e)
            if (e instanceof HttpError)
                setError(e.message)
            else alert(e)
        }
    }

    const [showCreateTopicModal, setShowCreateTopicModal] = useState(false)
    const onTopicCreated = async (topic: Topic) => {
        if (!topics) await mutateTopic()
        else await mutateTopic([...topics, topic])
    }

    const submitButton = useMemo(() => (
        <PrimaryButton type="submit" variant="contained" fullWidth disabled={isSubmitting}>Publish</PrimaryButton>
    ), [isSubmitting]);

    if (!user && !userLoading) router.push(Routes.Home)

    if (userLoading) return <CenteredBox><CircularProgress/></CenteredBox>

    return (
        <>
            <Head>
                <title>Post - BlogVault</title>
            </Head>
            <NavScreen selected={NavPage.Post}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Box
                        padding={4}
                        display="flex"
                        gap={2}
                        sx={{overflowX: "hidden", flexDirection: {xs: "column", md: "row"}}}
                        alignItems="stretch"
                    >

                        <Stack
                            position="static"
                            flex={0.4}
                            direction='column'
                            spacing={2}
                        >
                            <Typography variant="h4">Create New Blog</Typography>

                            <BlogMetaSection
                                topics={topics || []}
                                form={form}
                                error={error}
                                onTopicCreated={onTopicCreated}
                                onCreateTopicClick={() => setShowCreateTopicModal(true)}
                            />

                            {/*Desktop View*/}
                            {!isBelowSm && submitButton}

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

                        {/*Mobile View*/}
                        {isBelowSm && submitButton}

                    </Box>

                </form>

                {showCreateTopicModal &&
                    <CreateTopicModal
                        onTopicCreated={onTopicCreated}
                        dismiss={() => setShowCreateTopicModal(false)}/>
                }

            </NavScreen>
        </>

    )
}


export default CreateNewBlogPage;
