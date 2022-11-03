import { DataSource, MongodbFindOneOptions, MongoRepository } from "typeorm";
import { Movie } from "../Models/Movie";
import { ObjectId } from "mongodb";
import { MovieFetchQuery } from "../Types/TGlobal";

export class MoviesRepository {
    private readonly Repository: MongoRepository<Movie>;
    private readonly con: DataSource;

    public constructor(context: DataSource) {
        this.Repository = context.getMongoRepository(Movie);
        this.con = context;
    }

    public async FetchMovies(page: number, url_query?: {}): Promise<Array<Movie>> {
        try {
            const movies: Array<Movie> = await this.Repository.find({ take: 10, skip: 10 * page });
            return movies;
        } catch (err) {
            throw (err);
        }
    }

    public async FetchMoviesById(param_id: string): Promise<Movie | null> {
        try {
            const doc_id: ObjectId = new ObjectId(param_id);
            const movie: Movie | null = await this.Repository.findOneBy(doc_id);
            return movie;
        } catch (err) {
            throw (err);
        }
    }
}