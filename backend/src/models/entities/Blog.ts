import {InferSchemaType, model, Schema} from 'mongoose';

const blogSchema = new Schema({
    slug: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    content: {type: String, required: true},
    topics: [{type: Schema.Types.ObjectId, ref: 'Topic'}],
    coverImage: {type: String, required: true},
    posterImage: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
}, {timestamps: true});

export type Blog = InferSchemaType<typeof blogSchema>;

export default model<Blog>('Blog', blogSchema);