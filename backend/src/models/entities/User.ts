import {InferSchemaType, model, Schema} from "mongoose";
import createHttpError from "http-errors";

const userSchema = new Schema({
    username: {type: String, unique: true, sparse: true},
    email: {type: String, unique: true, sparse: true, select: false},
    password: {type: String, select: false},
    displayName: {type: String},
    about: {type: String},
    profilePicUrl: {type: String},
    googleId: {type: String, unique: true, sparse: true, select: false},
    githubId: {type: String, unique: true, sparse: true, select: false},
}, {timestamps: true});

userSchema.pre('validate', function (next) {
    if (!this.email && !this.googleId && !this.githubId)
        next(createHttpError(400, 'User must have an email or social auth provider'));
    else next()
})


export type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema);