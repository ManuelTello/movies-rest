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
        this.Router.get("/id/:id", this.FetchMovieById.bind(this));

    }

    private async FetchMovie(req: Request, res: Response): Promise<void> {
        try {
            const page: number = req.query ? parseInt(req.query.page as string) : 0;
            const movies: Array<Movie> = await this.Repository.FetchMovies(page);
            const status: number = movies ? 200 : 404;
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