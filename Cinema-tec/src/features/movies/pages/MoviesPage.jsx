import React, { useState, useEffect, useMemo } from 'react';
import * as movieService from '../services/movieService';
import { Container, Button, Modal, InputGroup, Form } from 'react-bootstrap';
import { GenericDataTable } from '../../../components/GenericDataTable';
import { MovieFormModal } from '../components/MovieFormModal';

export const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const fetchMovies = () => {
        setLoading(true);
        movieService.getAllMovies()
            .then(response => {
                setMovies(response.data);
                setError(null);
            })
            .catch(error => {
                console.error("Failed to fetch movies:", error);
                setError("Could not load movie data.");
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleOpenFormModal = (movie = null) => {
        setSelectedMovie(movie);
        setShowFormModal(true);
    };

    const handleCloseFormModal = () => {
        setShowFormModal(false);
        setSelectedMovie(null);
    };

    const handleOpenDeleteModal = (movie) => {
        setSelectedMovie(movie);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedMovie(null);
    };

    const handleSave = (movieData) => {
        const savePromise = movieData.id
            ? movieService.updateMovie(movieData.id, movieData)
            : movieService.createMovie(movieData);

        savePromise
            .then(() => {
                fetchMovies();
            })
            .catch(err => console.error("Failed to save movie:", err));
    };

    const handleDelete = () => {
        if (selectedMovie) {
            movieService.deleteMovie(selectedMovie.id)
                .then(() => {
                    handleCloseDeleteModal();
                    fetchMovies(); // Re-fetch data
                })
                .catch(err => console.error("Failed to delete movie:", err));
        }
    };

    const filteredMovies = useMemo(() =>
        movies.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        ), [movies, searchTerm]);

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
        {
            header: 'Actions',
            accessor: 'id',
            cell: (id, rowData) => (
                <>
                    <Button variant="outline-primary" size="sm" onClick={() => handleOpenFormModal(rowData)} className="me-2">
                        Edit
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleOpenDeleteModal(rowData)}>
                        Delete
                    </Button>
                </>
            )
        }
    ];

    return (
        <Container>
            <header className="d-flex justify-content-between align-items-center my-4">
                <h2>Movies</h2>
                <Button variant="primary" onClick={() => handleOpenFormModal()}>
                    New Movie
                </Button>
            </header>

            <div className="row mb-4">
                <div className="col-md-8">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Search by movie title"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </div>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && !error && (
                <GenericDataTable data={filteredMovies} columns={movieColumns} />
            )}

            <MovieFormModal
                show={showFormModal}
                handleClose={handleCloseFormModal}
                movie={selectedMovie}
                onSave={handleSave}
            />

            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the movie: <strong>{selectedMovie?.title}</strong>?
                    <p className="text-danger">This action cannot be undone.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
};
