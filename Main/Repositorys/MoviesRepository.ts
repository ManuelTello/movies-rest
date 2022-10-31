import { DataSource, MongoRepository, ObjectID } from "typeorm";
import { Movie } from "../Models/Movie";

export class MoviesRepository {
    private readonly Repository: MongoRepository<Movie>;

    public constructor(context: DataSource) {
        this.Repository = context.getMongoRepository(Movie);
    }

    public async FetchMovies(): Promise<Array<Movie>> {
        try {
            const movies: Array<Movie> = await this.Repository.find();
            return movies;
        } catch (err) {
            throw (err);
        }
    }

    public async FetchMoviesById(id: string): Promise<Movie | null> {
        try {
            const _id: ObjectID = new ObjectID(id);
            const movie: Movie | null = await this.Repository.findOneBy({ _id: _id });
            return movie;
        } catch (err) {
            throw (err);
        }
    }
}