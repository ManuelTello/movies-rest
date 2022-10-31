import { Request, Response, Router } from "express";
import { DataSource } from "typeorm";
import { IController } from "../Interfaces/IController";
import { Movie } from "../Models/Movie";
import { MoviesRepository } from "../Repositorys/MoviesRepository";

export class MoviesControllers implements IController {
    public Router: Router = Router()
    public Path: string = "movies";
    private readonly Repository: MoviesRepository;

    public constructor(context: DataSource) {
        this.InitRoutes();
        this.Repository = new MoviesRepository(context);
    }

    public InitRoutes(): void {
        this.Router.get("/", this.FetchMovie.bind(this));
        this.Router.get("/:id", this.FetchMovieById.bind(this));

    }

    private async FetchMovie(req: Request, res: Response): Promise<void> {
        try {
            const movies: Promise<Array<Movie>> = this.Repository.FetchMovies();
            const status: number = await movies ? 200 : 404;
            res.status(status).json(movies);
        } catch (err) {
            throw (err);
        }
    }

    private async FetchMovieById(req: Request, res: Response): Promise<void> {
        try {
            const id: string = req.params.id;
            const movie: Movie | null = await this.Repository.FetchMoviesById(id);
            const status: number = movie ? 200 : 404;
            res.status(status).json(movie);
        } catch (err) {
            throw (err);
        }
    }
}