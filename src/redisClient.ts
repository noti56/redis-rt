import { createClient } from "redis";

export const redisClient = createClient({
  url: `redis://localhost:6379`,
  // password: "any password",
});
const startClient = async () => {
  await redisClient.connect();
};

void startClient();
