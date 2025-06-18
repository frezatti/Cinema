import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

export const MovieFormModal = ({ show, handleClose, entity, onSave }) => {
    const [formData, setFormData] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        const defaultData = {
            title: '',
            genre: '',
            rating: '',
            duration: '',
            releaseDate: '',
            description: '',
            image: ''
        };

        setFormData(entity || defaultData);

        // Set current image for editing
        if (entity && entity.image) {
            setCurrentImage(entity.image);
            setImagePreview(entity.image);
        } else {
            setCurrentImage(null);
            setImagePreview(null);
        }
    }, [entity]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64Image = reader.result;
                setImagePreview(base64Image);
                setFormData(prev => ({ ...prev, image: base64Image }));
            };
            reader.onerror = () => {
                console.error("Error reading image file");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Use current image if no new image was selected
        const finalFormData = {
            ...formData,
            image: formData.image || currentImage || 'https://via.placeholder.com/150x220'
        };

        onSave(finalFormData);

        // Reset form
        setImagePreview(null);
        setCurrentImage(null);
    };

    const handleModalClose = () => {
        setImagePreview(null);
        setCurrentImage(null);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleModalClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{entity ? 'Edit Movie' : 'New Movie'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row>
                        <Col md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={formData.title || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="description"
                                    value={formData.description || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Genre</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="genre"
                                            value={formData.genre || ''}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Select
                                            name="rating"
                                            value={formData.rating || ''}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Rating</option>
                                            <option value="G">G</option>
                                            <option value="PG">PG</option>
                                            <option value="PG-13">PG-13</option>
                                            <option value="R">R</option>
                                            <option value="NC-17">NC-17</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Duration (minutes)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="duration"
                                            value={formData.duration || ''}
                                            onChange={handleChange}
                                            required
                                            min="1"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Release Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="releaseDate"
                                            value={formData.releaseDate ? formData.releaseDate.split('T')[0] : ''}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>

                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Movie Poster</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <Form.Text className="text-muted">
                                    Upload a movie poster image
                                </Form.Text>
                            </Form.Group>

                            {(imagePreview || currentImage) && (
                                <div className="mt-3">
                                    <img
                                        src={imagePreview || currentImage}
                                        alt="Movie poster preview"
                                        style={{
                                            width: '100%',
                                            maxWidth: '200px',
                                            height: 'auto',
                                            borderRadius: '8px',
                                            border: '1px solid #dee2e6'
                                        }}
                                    />
                                </div>
                            )}
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
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
