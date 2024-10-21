import { createClient } from "redis";

type ClientProps = Parameters<typeof createClient>[0];
export const redisClient = (x: ClientProps) => createClient(x);
export class RedisClient {
  private static instance: RedisClient;
  private constructor(x: ClientProps) {
    this.db = createClient(x);
    this.db.connect();
  }
  db: ReturnType<typeof createClient>;

  public static getInstance(x: ClientProps | null): RedisClient {
    if (!RedisClient.instance) {
      if (!x)
        throw new Error(
          "RedisClient needs a config, please verify you first start the redis client before starting any models"
        );
      RedisClient.instance = new RedisClient(x);
    }
    return RedisClient.instance;
  }
}
