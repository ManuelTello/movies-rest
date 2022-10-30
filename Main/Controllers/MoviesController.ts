import { Router } from "express";
import { IController } from "../Interfaces/IController";

export class MoviesControllers implements IController {
    public readonly Router: Router = Router()
    public readonly Path: string = "movies";

    public constructor() {

    }

    public InitRoutes(): void {
    }
}