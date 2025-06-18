import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as movieService from '@/features/movies/services/movieService';
import * as theaterService from '@/features/theater/services/theaterService';

export const SessionModal = ({ show, handleClose, entity, onSave }) => {
    const [formData, setFormData] = useState({});
    const [movies, setMovies] = useState([]);
    const [theaters, setTheaters] = useState([]);

    useEffect(() => {
        movieService.getAllMovies().then(setMovies);
        theaterService.getAll().then(setTheaters);

        const initialData = entity || {
            language: 'Dublado',
            format: '2D',
            price: '',
            dateTime: '',
            movieId: '',
            theaterId: '',
        };
        setFormData(initialData);
    }, [entity, show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            price: parseFloat(formData.price),
            movieId: parseInt(formData.movieId),
            theaterId: parseInt(formData.theaterId),
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{entity ? 'Edit Session' : 'New Session'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Movie</Form.Label>
                        <Form.Select name="movieId" value={formData.movieId || ''} onChange={handleChange} required>
                            <option value="">Select a Movie</option>
                            {movies.map(movie => (
                                <option key={movie.id} value={movie.id}>{movie.title}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Theater</Form.Label>
                        <Form.Select name="theaterId" value={formData.theaterId || ''} onChange={handleChange} required>
                            <option value="">Select a Theater</option>
                            {theaters.map(theater => (
                                <option key={theater.id} value={theater.id}>{`Theater ${theater.number}`}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Language</Form.Label>
                        <Form.Select name="language" value={formData.language || ''} onChange={handleChange} required>
                            <option value="Dublado">Dublado</option>
                            <option value="Legendado">Legendado</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Format</Form.Label>
                        <Form.Select name="format" value={formData.format || ''} onChange={handleChange} required>
                            <option value="2D">2D</option>
                            <option value="3D">3D</option>
                            <option value="IMAX">IMAX</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Session Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="dateTime"
                            value={formData.dateTime ? new Date(formData.dateTime).toISOString().slice(0, 16) : ''}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            name="price"
                            value={formData.price || ''}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
