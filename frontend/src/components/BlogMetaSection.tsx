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
import Link from "@mui/material/Link";
import Topic from "@/data/models/Topic";

interface BlogMetaSectionProps {
    topics: Topic[]
    form: UseFormReturn<any>
    error?: string
    coverImage?: string
    className?: string,
    onCreateTopicClick: () => void
    onTopicCreated: (topic: Topic) => void
}

const BlogMetaSection = ({
                             topics,
                             form,
                             error,
                             coverImage,
                             className,
                             onTopicCreated,
                             onCreateTopicClick
                         }: BlogMetaSectionProps) => {

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
                    multiline
                    maxRows={2}
                    maxLength={100}
                    onBlur={setSlug}
                    placeholder="Enter title"
                />

                <FormTextField
                    control={form.control}
                    name="slug"
                    label="Slug"
                    showLength
                    multiline
                    maxRows={2}
                    maxLength={100}
                    placeholder="Enter slug"
                />

                <FormTextField
                    control={form.control}
                    name="description"
                    label="Description"
                    showLength
                    multiline
                    rows={3}
                    maxLength={300}
                    placeholder="Enter description"
                />

                <Stack spacing={1} paddingBottom={2}>
                    <FormAutoComplete
                        control={form.control}
                        name="topics"
                        options={topics}
                        placeholder="Select Topics"
                        max={3}
                        getOptionLabel={(topic: Topic) => topic.name}
                    />

                    <Link
                        onClick={onCreateTopicClick}
                        sx={{cursor: 'pointer'}}
                    >
                        Create a new topic
                    </Link>
                </Stack>

            </Stack>
        </Stack>
    )
}

export default BlogMetaSection