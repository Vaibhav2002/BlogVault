import {Schema, InferSchemaType, model} from "mongoose";

const hashTagSchema = new Schema({
    name: {type: String, required: true, unique: true},
}, {timestamps: true});

type HashTag = InferSchemaType<typeof hashTagSchema>

export default model<HashTag>('HashTag', hashTagSchema)

