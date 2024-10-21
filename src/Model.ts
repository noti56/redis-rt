import { ZodTypeAny } from "zod";
import { delimeter, Schema } from "./consts";
import { BaseModel } from "./BaseModel";
import { Listeners } from "./Listeners";

export class Model<T extends ZodTypeAny> extends BaseModel<T> {
  constructor(private modelName: string, public schema: T) {
    super();
  }
  private listneres = new Listeners<T>();
  private dbKey(idKey: string) {
    return `${this.modelName}${delimeter}${idKey}`;
  }

  async create(key: string, value: Schema<T>) {
    this.schema.parse(value);
    const result = await this.set(this.dbKey(key), value);
    this.listneres.getListener(key)?.next(result);
    return result;
  }

  async read(key: string): Promise<Schema<T>> {
    return this.schema.parse(await this.get(this.dbKey(key)));
  }

  async update(key: string, value: Partial<Schema<T>>) {
    const oldValue = await this.get(this.dbKey(key));
    const newValue = { ...oldValue, ...value };
    this.schema.parse(newValue);
    const result = await this.set(this.dbKey(key), newValue);
    this.listneres.getListener(key)?.next(newValue);
    return result;
  }

  delete(key: string) {
    this.listneres.getListener(key)?.next(null);
    return this.del(this.dbKey(key));
  }

  listenTo(key: string) {
    return this.listneres.addListener(key, () => this.read(key));
  }
}
