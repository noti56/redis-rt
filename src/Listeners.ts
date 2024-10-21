import { BehaviorSubject, tap } from "rxjs";
import { ZodTypeAny } from "zod";
import { Schema } from "./consts";

export class Listeners<T extends ZodTypeAny> {
  constructor() {}
  listeners = new Map<string, BehaviorSubject<Schema<T> | null>>();

  getListener(key: string) {
    return this.listeners.get(key);
  }
  async addListener(key: string, getValueFromDb: () => Promise<Schema<T> | null>) {
    const l = this.listeners.get(key);
    if (l) return l;
    const v = await getValueFromDb();
    const s = new BehaviorSubject<Schema<T> | null>(v);
    this.listeners.set(key, s);
    return s;
  }
}
