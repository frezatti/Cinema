import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
    create(createMovieDto: CreateMovieDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        genre: string;
        rating: string;
        duration: number;
        releaseDate: Date;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        genre: string;
        rating: string;
        duration: number;
        releaseDate: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        genre: string;
        rating: string;
        duration: number;
        releaseDate: Date;
    }>;
    update(id: string, updateMovieDto: UpdateMovieDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        genre: string;
        rating: string;
        duration: number;
        releaseDate: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        genre: string;
        rating: string;
        duration: number;
        releaseDate: Date;
    }>;
}
