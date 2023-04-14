import {Schema, InferSchemaType, model} from "mongoose";

const topicSchema = new Schema({
    name: {type: String, required: true, unique: true},
}, {timestamps: true});

type Topic = InferSchemaType<typeof topicSchema>

export default model<Topic>('Topic', topicSchema)