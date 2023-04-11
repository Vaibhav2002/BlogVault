import React from 'react';
import {Alert, Collapse, Stack, Typography} from "@mui/material";
import FormInputField from "@/components/form/FormInputField";
import PrimaryButton from "@/components/styled/PrimaryButton";
import {UseFormReturn} from "react-hook-form";
import {BlogInput} from "@/pages/blogs/create-blog";
import {generateSlug} from "@/utils/Helpers";
import FormAutoComplete from "@/components/form/FormAutoComplete";

interface BlogMetaSectionProps {
    tags: Tag[]
    form: UseFormReturn<BlogInput>
    error?: string
    className?: string
}

const BlogMetaSection = ({tags, form, error, className}: BlogMetaSectionProps) => {

    const {register, watch, getValues, setValue, formState: {errors, isSubmitting}} = form

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
                <Alert variant="filled" severity="error">{errorText}</Alert>
            </Collapse>

            <Stack spacing={3}>
                <FormInputField
                    register={register("title", {required: "Blog title is required", maxLength: 100})}
                    placeholder="Enter Blog Title"
                    maxLength={100}
                    fontSize={21}
                    value={watch('title')}
                    label="Title"
                    fieldError={errors.title}
                    onBlur={setSlug}
                    showLength
                />

                <FormInputField
                    register={register("slug", {required: "Slug is required", maxLength: 100})}
                    placeholder="Enter Blog Slug"
                    maxLength={100}
                    label='Slug'
                    value={watch('slug')}
                    fieldError={errors.slug}
                    showLength
                />

                <FormInputField
                    register={register("description", {required: "Blog description is required", maxLength: 300})}
                    placeholder="Enter blog Description"
                    maxLength={300}
                    fieldError={errors.description}
                    multiline
                    label="Description"
                    value={watch('description')}
                    showLength
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
