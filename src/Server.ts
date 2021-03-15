import { ExpressApp } from "./app";
import { Repositories } from "./data/repositories";
import { Services } from "./domain/use-cases";
import { Controllers } from "./app/controllers";
import http from "http";
import logger from "./utils/logger";

class Server {
  repositories = new Repositories();
  services = new Services(this.repositories);
  controllers = new Controllers(this.services);
  app = new ExpressApp(this.controllers);

  server: http.Server;
  httpPort: string;

  constructor() {
    this.httpPort = process.env.PORT || '3000';
    this.app.configure();

    this.server = http.createServer(this.app.app);
    this.server.on("error", this.getOnError());
  }

  async run() {
    this.server.listen(this.httpPort, this.getOnListening());
  }

  getOnListening() {
    const httpPort = this.httpPort;
    return () => {
      logger.info({
        action: "startup",
        message: `Listening on the ports: ${httpPort}`,
      });
    };
  }

  getOnError() {
    return (error: any) => {
      if (error.syscall !== "listen") {
        throw error;
      }
      logger.fatal({ errorCode: error.code, error });
      switch (error.code) {
        case "EACCES":
          process.exit(1);
          break;
        case "EADDRINUSE":
          process.exit(1);
          break;
        default:
          throw error;
      }
    };
  }
}

export const server = new Server();
(async () => await server.run())();
