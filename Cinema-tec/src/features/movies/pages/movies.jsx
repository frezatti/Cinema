import React from 'react';
import { EntityPage } from '@/components/entityPage';
import * as movieService from '@/features/movies/services/movieService';
import { MovieFormModal } from '@/features/movies/components/movieModal';

export const Movie = () => {

    const movieColumns = [
        { header: 'ID', accessor: 'id' },
        {
            header: 'Poster',
            accessor: 'image',
            cell: (image) => (
                <img
                    src={image || 'https://via.placeholder.com/50x75'}
                    alt="Movie poster"
                    style={{
                        width: '50px',
                        height: '75px',
                        objectFit: 'cover',
                        borderRadius: '4px'
                    }}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/50x75';
                    }}
                />
            )
        },
        { header: 'Title', accessor: 'title' },
        { header: 'Genre', accessor: 'genre' },
        { header: 'Rating', accessor: 'rating' },
        {
            header: 'Duration',
            accessor: 'duration',
            cell: (duration) => `${duration} min`
        },
        {
            header: 'Release Date',
            accessor: 'releaseDate',
            cell: (value) => {
                try {
                    return new Date(value).toLocaleDateString('pt-BR');
                } catch (e) {
                    return value;
                }
            }
        },
        {
            header: 'Description',
            accessor: 'description',
            cell: (description) => {
                if (!description) return '-';
                return description.length > 50
                    ? `${description.substring(0, 50)}...`
                    : description;
            }
        }
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
