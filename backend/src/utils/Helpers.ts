export function assertIsDefined<T>(value:T, name:string): asserts value is NonNullable<T>{
    if(value === undefined || value === null)
        throw new Error(`Expected ${name} to be defined, but it was ${value}.`)
}