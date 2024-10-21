import { z } from "zod";
import { Model } from "./Model";
import "./redisClient";

const movement = new Model("movement", z.object({ x: z.number(), y: z.number() }));
(async () => {
  const subscription = await movement.listenTo("1");
  subscription.subscribe((x) => console.log(x));

  setTimeout(() => {
    // Correct way to update the model
    movement.update("1", { y: 10, x: 50 });
  }, 3000);
})();
