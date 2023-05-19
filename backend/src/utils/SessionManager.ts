import {MongoId} from "./Helpers";
import mongoose from "mongoose";
import redisClient from "../config/RedisClient";
import env from "./CleanEnv";

export const revokeAllUserSession = async (userId: MongoId) => {
    if (env.NODE_ENV === 'development') await revokeFromMongoStore(userId.toString())
    else await revokeFromRedisStore(userId.toString())
}

const revokeFromRedisStore = async (userId: string) => {
    let cursor = 0
    do {
        const results = await redisClient.scan(cursor, {MATCH: `sess:${userId}*`})
        for (const key of results.keys)
            await redisClient.del(key)
        cursor = results.cursor
    } while (cursor !== 0)
}

const revokeFromMongoStore = async (userId: string) => {
    const idMatcher = new RegExp(`^${userId.toString()}`)
    await mongoose.connection.db.collection('sessions').deleteMany({_id: idMatcher})
}