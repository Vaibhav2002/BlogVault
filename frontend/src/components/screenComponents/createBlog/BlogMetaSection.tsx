import React from 'react';
import {Alert, Collapse, Stack, Typography} from "@mui/material";
import PrimaryButton from "@/components/styled/PrimaryButton";
import {UseFormReturn} from "react-hook-form";
import {BlogInput} from "@/pages/blogs/create";
import {generateSlug} from "@/utils/Helpers";
import FormTextField from "@/components/form/FormTextField";
import FormAutoComplete from "@/components/form/FormAutoComplete";
import FormImagePicker from "@/components/form/FormImagePicker";

interface BlogMetaSectionProps {
    topics: Topic[]
    form: UseFormReturn<BlogInput>
    error?: string
    className?: string
}

const BlogMetaSection = ({topics, form, error, className}: BlogMetaSectionProps) => {

    const {getValues, setValue, formState: {errors, isSubmitting}} = form

    const errorText = errors.content?.message ?? error

    const setSlug = () => {
        console.log('title', getValues('title'))
        const title = getValues('title')
        const slug = generateSlug(title)
        setValue('slug', slug, {shouldValidate: true})
    }

    return (
        <Stack className={className} spacing={3}>

            <Typography variant="h4">Create New Blog</Typography>

            <Collapse in={!!errorText}>
                <Alert variant="filled" severity="error">{errorText}</Alert>
            </Collapse>

            <Stack spacing={3}>

                <FormTextField
                    control={form.control}
                    name="title"
                    label="Title"
                    showLength
                    maxLength={100}
                    onBlur={setSlug}
                    rules={{required: "Title is required"}}
                    placeholder="Enter title"
                />

                <FormTextField
                    control={form.control}
                    name="slug"
                    label="Slug"
                    showLength
                    rules={{required: "Slug is required"}}
                    maxLength={100}
                    placeholder="Enter slug"
                />

                <FormTextField
                    control={form.control}
                    name="description"
                    label="Description"
                    showLength
                    rules={{required: "Description is required"}}
                    maxLength={300}
                    placeholder="Enter description"
                    maxRows={6}
                />

                <FormImagePicker
                    control={form.control}
                    name="coverImage"
                    rules={{required: "Cover Image is required"}}
                />

                <FormAutoComplete
                    control={form.control}
                    name="topics"
                    options={topics}
                    rules={{required: "Topics are required"}}
                    placeholder="Select Topics"
                    max={3}
                    getOptionLabel={(topic: Topic) => topic.name}
                />

                <PrimaryButton
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                >
                    Publish
                </PrimaryButton>
            </Stack>

        </Stack>
    )
}

export default BlogMetaSection;
