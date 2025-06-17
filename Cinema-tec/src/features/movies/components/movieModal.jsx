import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export const MovieFormModal = ({ show, handleClose, movie, onSave }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData(movie || {});
    }, [movie]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSave = () => {
        onSave(formData);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{formData.id ? 'Edit Movie' : 'Add New Movie'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* We are simplifying the form for this example. You can add all original fields here. */}
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" id="title" value={formData.title || ''} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Genre</Form.Label>
                        <Form.Select id="genre" value={formData.genre || ''} onChange={handleChange} required>
                            <option value="">Select a genre</option>
                            <option value="Ação">Ação</option>
                            <option value="Aventura">Aventura</option>
                            <option value="Comédia">Comédia</option>
                            <option value="Drama">Drama</option>
                            {/* Add other genres */}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Rating</Form.Label>
                        <Form.Select id="rating" value={formData.rating || ''} onChange={handleChange} required>
                            <option value="">Select a rating</option>
                            <option value="L">Livre</option>
                            <option value="10">10 anos</option>
                            <option value="12">12 anos</option>
                            <option value="14">14 anos</option>
                            <option value="16">16 anos</option>
                            <option value="18">18 anos</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Duration (minutes)</Form.Label>
                        <Form.Control type="number" id="duration" value={formData.duration || ''} onChange={handleChange} min="1" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Release Date</Form.Label>
                        <Form.Control type="date" id="releaseDate" value={formData.releaseDate ? formData.releaseDate.split('T')[0] : ''} onChange={handleChange} required />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
