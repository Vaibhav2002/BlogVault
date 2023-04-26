import {UseFormReturn} from "react-hook-form";
import useFormImage from "@/hooks/useFormImage";
import {generateSlug} from "@/utils/Helpers";
import {Alert, Box, Collapse, Stack} from "@mui/material";
import Image from "next/image";
import placeholder from "@/assets/images/placeholder.png";
import FormImagePicker from "@/components/form/FormImagePicker";
import FormTextField from "@/components/form/FormTextField";
import FormAutoComplete from "@/components/form/FormAutoComplete";
import React from "react";

interface BlogMetaSectionProps {
    topics: Topic[]
    form: UseFormReturn<any>
    error?: string
    coverImage?: string
    className?: string
}

const BlogMetaSection = ({topics, form, error, coverImage, className}: BlogMetaSectionProps) => {

    const {getValues, setValue, watch, formState: {errors}} = form
    const {fileUrl: coverImageUrl} = useFormImage('coverImage', watch, coverImage)

    const errorText = error ?? errors?.content?.message?.toString()

    const setSlug = () => {
        const title = getValues('title')
        const slug = generateSlug(title)
        setValue('slug', slug, {shouldValidate: true})
    }

    return (
        <Stack className={className} spacing={3}>

            <Collapse in={!!errorText}>
                <Alert severity="error">{errorText}</Alert>
            </Collapse>

            <Stack spacing={3}>

                <Box>
                    <Box width={1} sx={{aspectRatio: "16/9"}} position="relative" marginBottom="1rem">
                        <Image src={coverImageUrl ?? placeholder} alt="Cover Image" fill
                               style={{borderRadius: "0.5rem"}}/>
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
            </Stack>

        </Stack>
    )
}

export default BlogMetaSection