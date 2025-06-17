import React from 'react';
import { EntityPage } from '@/components/entityPage';
import * as movieService from '@/features/movies/services/movieService';
import { MovieFormModal } from '@/features/movies/components/movieModal';

export const Movies = () => {

    const movieColumns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Title', accessor: 'title' },
        { header: 'Genre', accessor: 'genre' },
        { header: 'Rating', accessor: 'rating' },
        { header: 'Duration', accessor: 'duration' },
        {
            header: 'Release Date',
            accessor: 'releaseDate',
            cell: (value) => new Date(value).toLocaleDateString()
        },
    ];

    const genericMovieService = {
        getAll: movieService.getAllMovies,
        create: movieService.createMovie,
        update: movieService.updateMovie,
        remove: movieService.deleteMovie,
    };

    return (
        <EntityPage
            entityName="Movie"
            entityLabel="Movies"
            service={genericMovieService}
            columns={movieColumns}
            formComponent={MovieFormModal}
        />
    );
};
