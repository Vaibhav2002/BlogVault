import {InferSchemaType, model, Schema} from "mongoose";

const savedBlogSchema = new Schema({
    blog: {type: Schema.Types.ObjectId, ref: 'Blog', unique: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', unique: true},
}, {timestamps: true});

type SavedBlog = InferSchemaType<typeof savedBlogSchema>;

export default model<SavedBlog>('SavedBlog', savedBlogSchema);