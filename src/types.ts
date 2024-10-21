import { ZodTypeAny } from "zod";

export type Schema<T extends ZodTypeAny> = Zod.infer<T>;
