import { createClient  } from "redis";
import RedisStore from 'connect-redis'

export const connectRedis = async () => {
  try {
    const redisClient = createClient({ url: process.env.DB_REDIS_URL })
    await redisClient.connect()

    return new RedisStore({ client: redisClient })

  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
