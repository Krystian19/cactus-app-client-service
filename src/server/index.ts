import Server from "./server";
import logger from '@cactus-app/js-logger-module';

// Web server's working port env variable
const PORT: Number = Number(process.env.PORT || 3000);

Server.listen(PORT, () => {
  console.log(`Web client server listening @ http://localhost:${PORT}`);
  logger.info({}, `Web client server listening @ http://localhost:${PORT}`);
});
