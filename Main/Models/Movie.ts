import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

class Awards {
    @Column("int")
    wins?: number;

    @Column("int")
    nominations?: number;

    @Column("string")
    text?: string;
}

class Imdb {
    @Column("float")
    rating?: number;

    @Column("int")
    votes?: number;

    @Column("int")
    id?: number;
}

class Viewer {
    @Column("int")
    rating?: number;

    @Column("int")
    numRevies?: number;

    @Column("int")
    meter?: number;
}

class Tomatoes {
    @Column((type) => Viewer)
    viewer?: Viewer;

    @Column("date")
    lastUpdated?: Date;
}

@Entity("movies")
export class Movie {
    @ObjectIdColumn()
    _id?: ObjectID;

    @Column("string")
    plot?: string;

    @Column("string", { array: true })
    genres?: string;

    @Column("int")
    runtime?: number;

    @Column("string", { array: true })
    cast?: string;

    @Column("int")
    num_mflix_comments?: number;

    @Column("string")
    title?: string;

    @Column("string")
    fullplot?: string;

    @Column("string", { array: true })
    countries?: string;

    @Column("date")
    released?: Date;

    @Column("string", { array: true })
    directors?: string;

    @Column("string")
    rated?: string;

    @Column((type) => Awards)
    awards?: Awards;

    @Column("string")
    lastupdated?: string;

    @Column("int")
    year?: number;

    @Column((type) => Imdb)
    imdb?: Imdb;

    @Column((type) => Tomatoes)
    tomatoes?: Tomatoes;

    @Column("string")
    type?: string;
}