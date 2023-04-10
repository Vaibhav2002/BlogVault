import {InferSchemaType, model, Schema} from "mongoose";

const userSchema = new Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true, select: false},
    password: {type: String, required: true, select: false},
}, {timestamps: true});

export type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema);