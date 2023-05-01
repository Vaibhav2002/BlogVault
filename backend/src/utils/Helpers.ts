import createHttpError from "http-errors";
import * as mongoose from "mongoose";

export function assertIsDefined<T>(value: T, name: string): asserts value is NonNullable<T> {
    if (!value)
        throw createHttpError(400, `Expected ${name} to be defined, but it was ${value}.`)
}

export const appendLastUpdated = (url: string) => `${url}?lastUpdated=${Date.now()}`

export function run<T, R>(value: T | undefined | null, block: (value: T) => R) {
    if (value) return block(value);
    return undefined
}

export type MongoId = mongoose.Types.ObjectId