import "reflect-metadata";
import express, { Application, NextFunction, Request, Response } from "express";
import { AppDbContext } from "./Context/AppDbContext";
import { DataSource } from "typeorm";
import { IController } from "./Interfaces/IController";
import { Movie } from "./Models/Movie";


class Server {
    private readonly Application: Application = express();
    private readonly Port: number = parseInt(process.env.PORT!);
    public static ServerInstance: Server;

    private constructor() { }

    public static GetServerInstance(): Server {
        if (!Server.ServerInstance) {
            Server.ServerInstance = new Server();
        }
        return Server.ServerInstance;
    }

    public async StartServer(context: DataSource): Promise<void> {
        try {
            await context.initialize();
            const a = await context.getMongoRepository(Movie).findOne({});
            console.log(a);
            this.InitializeRoutes([

            ]);
            this.Application.listen(this.Port, () => {
                console.log("Server up at localhost:", this.Port);
            });
        } catch (err) {
            console.log(err);
        }
    }

    public InitializeRoutes(controllers: Array<IController>): void {
        controllers.forEach(({ Router, Path }) => this.Application.use(`/api/${Path}/`, Router));

        this.Application.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.log("uy error", err.message);
        });
    }
}

Server.GetServerInstance().StartServer(new AppDbContext().GetContext());