import mongoose, {model, Schema} from "mongoose";

const commentSchema = new Schema({
    blogId: {type: Schema.Types.ObjectId, ref: "Blog", required: true},
    parentCommentId: {type: Schema.Types.ObjectId, ref: "Comment"},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    comment: {type: String, required: true},
}, {timestamps: true})

type Comment = mongoose.InferSchemaType<typeof commentSchema>

export default model<Comment>("Comment", commentSchema)