import { ZodTypeAny } from "zod";
import { Schema } from "./consts";
import { RedisClient } from "./RedisClient";

export class BaseModel<T extends ZodTypeAny> {
  protected async get(key: string) {
    const redisValue = await RedisClient.getInstance(null).db.get(key);
    if (!redisValue) return null;
    return JSON.parse(redisValue) as Promise<Schema<T>>;
  }
  protected set(key: string, value: Schema<T>) {
    return RedisClient.getInstance(null).db.set(key, JSON.stringify(value));
  }
  protected del(key: string) {
    return RedisClient.getInstance(null).db.del(key) as Promise<void>;
  }
}
