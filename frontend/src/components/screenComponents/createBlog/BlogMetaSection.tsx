import React from 'react';
import {Autocomplete, Stack, Typography} from "@mui/material";
import FormBaseInputField from "@/components/form/FormBaseInputField";
import PrimaryButton from "@/components/styled/PrimaryButton";
import {Control} from "react-hook-form";

interface BlogMetaSectionProps {
    tags: Tag[]
    control: Control<any>
    isSubmitting: boolean
}

const BlogMetaSection = ({tags, control, isSubmitting}: BlogMetaSectionProps) => {

    const areTagsEmpty = tags.length === 0
    return (
        <Stack spacing={3}>

            <Typography variant="h4">Create New Blog</Typography>

            <Stack spacing={3}>
                <FormBaseInputField
                    control={control}
                    name="Title"
                    rules={{required: "Title is required", minLength: 0, maxLength: 100}}
                    placeholder="Enter Blog Title"
                    fontSize={21}
                    fullWidth
                />

                <FormBaseInputField
                    control={control}
                    name="Description"
                    rules={{required: "Description is required", minLength: 0, maxLength: 300}}
                    placeholder="Enter blog Description"
                    multiline
                    maxRows={5}
                    fullWidth
                />

                {!areTagsEmpty &&
                    <Autocomplete
                        includeInputInList
                        autoComplete
                        id="auto-complete"
                        options={tags}
                        getOptionLabel={tag => tag.name}
                        renderInput={(params) =>
                            <FormBaseInputField
                                showLength={false}
                                control={control}
                                name="Tags"
                                placeholder="Add tags to you blog"
                                {...params}
                            />
                        }
                    />
                }

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
