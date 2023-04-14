import React from 'react';
import {Alert, Collapse, Stack, Typography} from "@mui/material";
import PrimaryButton from "@/components/styled/PrimaryButton";
import {UseFormReturn} from "react-hook-form";
import {BlogInput} from "@/pages/blogs/create";
import {generateSlug} from "@/utils/Helpers";
import FormTextField from "@/components/form/FormTextField";

interface BlogMetaSectionProps {
    tags: Tag[]
    form: UseFormReturn<BlogInput>
    error?: string
    className?: string
}

const BlogMetaSection = ({tags, form, error, className}: BlogMetaSectionProps) => {

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

                {/*{tags.length > 0 &&*/}
                {/*    <FormAutoComplete*/}
                {/*        register={register('tags')}*/}
                {/*        fieldError={errors.}*/}
                {/*        options={tags}*/}
                {/*        placeholder="Select Tags"*/}
                {/*        getOptionLabel={tag => tag.name}/>*/}
                {/*}*/}

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
