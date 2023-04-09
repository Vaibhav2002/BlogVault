import {InferSchemaType, model, Schema, Types} from 'mongoose';

const blogSchema = new Schema({
    slug: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    content: {type: String, required: true},
    hashtags: [{type: Types.ObjectId, ref: 'HashTag'}]
}, {timestamps: true});

export type Blog = InferSchemaType<typeof blogSchema>;

export default model<Blog>('Blog', blogSchema);