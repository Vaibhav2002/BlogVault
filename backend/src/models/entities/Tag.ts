import {Schema, InferSchemaType, model} from "mongoose";

const tagSchema = new Schema({
    name: {type: String, required: true, unique: true},
}, {timestamps: true});

type Tag = InferSchemaType<typeof tagSchema>

export default model<Tag>('Tag', tagSchema)

