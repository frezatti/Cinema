import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';

export const MovieFormModal = ({ show, handleClose, entity, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        rating: '',
        duration: '',
        releaseDate: '',
        description: '',
        poster: ''
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setError(''); // Clear errors when modal opens/closes

        if (entity) {
            setFormData({
                title: entity.title || '',
                genre: entity.genre || '',
                rating: entity.rating || '',
                duration: entity.duration || '',
                releaseDate: entity.releaseDate ? entity.releaseDate.split('T')[0] : '',
                description: entity.description || '',
                poster: entity.poster || ''
            });
            setCurrentImage(entity.poster || null);
            setImagePreview(entity.poster || null);
        } else {
            setFormData({
                title: '',
                genre: '',
                rating: '',
                duration: '',
                releaseDate: '',
                description: '',
                poster: ''
            });
            setCurrentImage(null);
            setImagePreview(null);
        }
    }, [entity, show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setError('');
        setFormData(prev => ({
            ...prev,
            [name]: name === 'duration' ? parseInt(value) || '' : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file');
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                const base64Image = reader.result;
                setImagePreview(base64Image);
                setFormData(prev => ({ ...prev, poster: base64Image }));
                setError('');
            };
            reader.onerror = () => {
                setError("Error reading poster file");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            if (!formData.title?.trim()) {
                throw new Error('Movie title is required');
            }

            if (!formData.genre?.trim()) {
                throw new Error('Genre is required');
            }

            if (!formData.rating) {
                throw new Error('Rating is required');
            }

            if (!formData.duration || formData.duration <= 0) {
                throw new Error('Duration must be a positive number');
            }

            if (!formData.releaseDate) {
                throw new Error('Release date is required');
            }

            const finalFormData = {
                title: formData.title.trim(),
                genre: formData.genre.trim(),
                rating: formData.rating,
                duration: parseInt(formData.duration),
                releaseDate: new Date(formData.releaseDate).toISOString(),
                description: formData.description?.trim() || '',
                poster: formData.poster || currentImage || 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image'
            };

            if (entity?.id) {
                finalFormData.id = entity.id;
            }

            console.log('Submitting movie data:', finalFormData);
            await onSave(finalFormData);

        } catch (err) {
            console.error('Movie save error:', err);

            // Handle specific error types
            if (err.message?.includes('Unique constraint failed')) {
                setError('A movie with this information already exists. Please check the title and details.');
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.message) {
                setError(err.message);
            } else {
                setError('An error occurred while saving the movie. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            genre: '',
            rating: '',
            duration: '',
            releaseDate: '',
            description: '',
            poster: ''
        });
        setImagePreview(null);
        setCurrentImage(null);
        setError('');
    };

    const handleModalClose = () => {
        if (!isSubmitting) {
            resetForm();
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleModalClose} size="lg" backdrop={isSubmitting ? 'static' : true}>
            <Modal.Header closeButton={!isSubmitting}>
                <Modal.Title>{entity ? 'Edit Movie' : 'New Movie'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && (
                        <Alert variant="danger" className="mb-3">
                            {error}
                        </Alert>
                    )}

                    <Row>
                        <Col md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label>Title *</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={formData.title || ''}
                                    onChange={handleChange}
                                    placeholder="Enter movie title"
                                    disabled={isSubmitting}
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
                                    placeholder="Enter movie description"
                                    disabled={isSubmitting}
                                />
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Genre *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="genre"
                                            value={formData.genre || ''}
                                            onChange={handleChange}
                                            placeholder="e.g., Action, Comedy, Drama"
                                            disabled={isSubmitting}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Rating *</Form.Label>
                                        <Form.Select
                                            name="rating"
                                            value={formData.rating || ''}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                            required
                                        >
                                            <option value="">Select Rating</option>
                                            <option value="G">G - General Audiences</option>
                                            <option value="PG">PG - Parental Guidance</option>
                                            <option value="PG-13">PG-13 - Parents Strongly Cautioned</option>
                                            <option value="R">R - Restricted</option>
                                            <option value="NC-17">NC-17 - Adults Only</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Duration (minutes) *</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="duration"
                                            value={formData.duration || ''}
                                            onChange={handleChange}
                                            placeholder="e.g., 120"
                                            disabled={isSubmitting}
                                            required
                                            min="1"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Release Date *</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="releaseDate"
                                            value={formData.releaseDate || ''}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
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
                                    disabled={isSubmitting}
                                />
                                <Form.Text className="text-muted">
                                    Upload a movie poster (max 5MB)
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
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image';
                                        }}
                                    />
                                </div>
                            )}
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleModalClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                {entity ? 'Updating...' : 'Creating...'}
                            </>
                        ) : (
                            entity ? 'Update Movie' : 'Create Movie'
                        )}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
