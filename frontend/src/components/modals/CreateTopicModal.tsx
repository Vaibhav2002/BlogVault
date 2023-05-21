import React, {useEffect, useState} from 'react';
import * as yup from 'yup'
import PrimaryModal from "@/components/modals/PrimaryModal";
import {Alert, Collapse, Stack, Typography} from "@mui/material";
import CenteredBox from "@/components/styled/CenteredBox";
import PrimaryButton from "@/components/styled/PrimaryButton";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormTextField from "@/components/form/FormTextField";
import {HttpError} from "@/data/HttpErrors";
import * as dataSource from "@/data/dataSources/TopicDataSource";
import useTracker from "@/hooks/useTracker";
import Topic from "@/data/models/Topic";

interface CreateTopicModalProps {
    onTopicCreated: (topic: Topic) => void,
    dismiss: () => void
    className?: string
}

const topicFormSchema = yup.object({
    topic: yup.string()
        .matches(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/, 'Special characters are not allowed')
        .max(20, 'Topic name must be less than 20 characters')
        .required('Required'),
})

type TopicFormValues = yup.InferType<typeof topicFormSchema>

const CreateTopicModal = ({onTopicCreated, dismiss, className}: CreateTopicModalProps) => {

    const {handleSubmit, control, formState: {isSubmitting, errors}} = useForm<TopicFormValues>({
        resolver: yupResolver(topicFormSchema)
    })
    const [error, setError] = useState<string>()
    const {createTopic, createTopicModalOpen} = useTracker()

    const onSubmit = async (data: TopicFormValues) => {
        try {
            setError(undefined)
            const topic = await dataSource.createNewTopic(data.topic)
            onTopicCreated(topic)
            createTopic()
            dismiss()
        } catch (e) {
            if (e instanceof HttpError)
                setError(e.message)
            else alert(e)
        }
    }

    useEffect(() => {
        setError(errors.topic?.message)
    }, [errors]);

    useEffect(() => {
        createTopicModalOpen()
    })

    return (
        <PrimaryModal open onDismiss={dismiss}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CenteredBox flexDirection='column' textAlign='center' gap={3}>

                    <Stack spacing={1}>
                        <Typography variant='h5'>Create a new topic</Typography>
                        <Typography variant='body1' color='text.disabled'>
                            Topics are used to categorize your posts. You can add a new topic by entering a name below.
                        </Typography>
                    </Stack>

                    <Collapse in={!!error} sx={{width: 1}}>
                        <Alert severity='error'>{error}</Alert>
                    </Collapse>

                    <FormTextField control={control} name='topic' label='Topic' placeholder='Enter topic name'
                                   fullWidth/>

                    <PrimaryButton variant='contained' type='submit' fullWidth
                                   disabled={isSubmitting}>Create</PrimaryButton>
                </CenteredBox>
            </form>
        </PrimaryModal>
    )
}

export default CreateTopicModal;
