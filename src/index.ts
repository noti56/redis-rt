// import { z } from "zod";
// import { Model } from "./Model";
// import { RedisClient } from "./RedisClient";
// RedisClient.getInstance({ url: "redis://localhost:6379" });

// const movement = new Model("movement", z.object({ x: z.number(), y: z.number() }));
// (async () => {
//   const subscription = await movement.listenTo("1");
//   subscription.subscribe((x) => console.log(x));

//   setTimeout(() => {
//     movement.update("1", { y: 10, x: 52 });
//   }, 3000);
// })();

export { delimeter } from "./consts";
export { BaseModel } from "./BaseModel";
export { Model } from "./Model";
export { RedisClient } from "./RedisClient";
