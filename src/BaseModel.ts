import { ZodTypeAny } from "zod";
import { Schema } from "./types";
import { redisClient } from "./redisClient";

export class BaseModel<T extends ZodTypeAny> {
  protected async get(key: string) {
    const redisValue = await redisClient.get(key);
    if (!redisValue) return null;
    return JSON.parse(redisValue) as Promise<Schema<T>>;
  }
  protected set(key: string, value: Schema<T>) {
    return redisClient.set(key, JSON.stringify(value));
  }
  protected del(key: string) {
    return redisClient.del(key) as Promise<void>;
  }
}
