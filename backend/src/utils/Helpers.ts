import createHttpError from "http-errors";

export function assertIsDefined<T>(value:T, name:string): asserts value is NonNullable<T>{
    if(!value)
        throw createHttpError(400, `Expected ${name} to be defined, but it was ${value}.`)
}