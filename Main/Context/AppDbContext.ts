import { join } from "path";
import { DataSource } from "typeorm";

export class AppDbContext {
    private readonly Context: DataSource;

    public constructor() {
        this.Context = new DataSource({
            type: "mongodb",
            url: process.env.DB_URI,
            database: process.env.DB_NAME,
            entities: [join(process.cwd(), "Main", "Models", "*.{ts,js}")],
            retryWrites: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    }

    public GetContext(): DataSource {
        return this.Context;
    }
}