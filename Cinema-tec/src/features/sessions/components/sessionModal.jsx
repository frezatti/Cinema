import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as movieService from '../../movies/services/movieService';
import * as theaterService from '../../theater/services/theaterService';


export const SessionModal = ({ show, handleClose, entity, onSave }) => {
    const [formData, setFormData] = useState({});
    const [movies, setMovies] = useState([]);
    const [theaters, setTheaters] = useState([]);

    useEffect(() => {
        // Fetch movies and theaters for the dropdowns
        movieService.getAllMovies().then(res => setMovies(res.data));
        theaterService.getAll().then(res => setTheaters(res.data));

        // Initialize form with entity data or defaults
        setFormData(entity || { movie_id: '', theater_id: '', session_time: '', ticket_price: '' });
    }, [entity]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            movie_id: parseInt(formData.movie_id),
            theater_id: parseInt(formData.theater_id),
            ticket_price: parseFloat(formData.ticket_price)
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
                        <Form.Select name="movie_id" value={formData.movie_id || ''} onChange={handleChange} required>
                            <option value="">Select a Movie</option>
                            {movies.map(movie => (
                                <option key={movie.id} value={movie.id}>{movie.title}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Theater</Form.Label>
                        <Form.Select name="theater_id" value={formData.theater_id || ''} onChange={handleChange} required>
                            <option value="">Select a Theater</option>
                            {theaters.map(theater => (
                                <option key={theater.id} value={theater.id}>{`Theater ${theater.number}`}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Session Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="session_time"
                            value={formData.session_time ? new Date(formData.session_time).toISOString().slice(0, 16) : ''}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ticket Price</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            name="ticket_price"
                            value={formData.ticket_price || ''}
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
