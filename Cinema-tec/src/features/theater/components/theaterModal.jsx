import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

export const TheaterModal = ({ show, handleClose, entity, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        capacity: '',
        type: '2D'
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setError('');
        if (entity) {
            setFormData({
                name: entity.name || '',
                number: entity.number || '',
                capacity: entity.capacity || '',
                type: entity.type || '2D'
            });
        } else {
            setFormData({
                name: '',
                number: '',
                capacity: '',
                type: '2D'
            });
        }
    }, [entity, show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setError('');
        setFormData(prev => ({
            ...prev,
            [name]: name === 'number' || name === 'capacity' ? parseInt(value) || '' : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            // Validate required fields
            if (!formData.name?.trim()) {
                throw new Error('Theater name is required');
            }

            if (!formData.number || formData.number <= 0) {
                throw new Error('Theater number must be a positive number');
            }

            if (!formData.capacity || formData.capacity <= 0) {
                throw new Error('Capacity must be a positive number');
            }

            // Prepare data for submission
            const submitData = {
                name: formData.name.trim(),
                number: parseInt(formData.number),
                capacity: parseInt(formData.capacity),
                type: formData.type
            };

            // If editing, include the ID
            if (entity) {
                submitData.id = entity.id;
            }

            await onSave(submitData);

        } catch (err) {
            console.error('Theater save error:', err);

            // Handle specific error types
            if (err.message?.includes('Unique constraint failed')) {
                if (err.message.includes('name')) {
                    setError('A theater with this name already exists. Please choose a different name.');
                } else if (err.message.includes('number')) {
                    setError('A theater with this number already exists. Please choose a different number.');
                } else {
                    setError('This theater information already exists. Please check the name and number.');
                }
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.message) {
                setError(err.message);
            } else {
                setError('An error occurred while saving the theater. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            number: '',
            capacity: '',
            type: '2D'
        });
        setError('');
    };

    const handleModalClose = () => {
        if (!isSubmitting) {
            resetForm();
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleModalClose} backdrop={isSubmitting ? 'static' : true}>
            <Modal.Header closeButton={!isSubmitting}>
                <Modal.Title>
                    {entity ? 'Edit Theater' : 'New Theater'}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && (
                        <Alert variant="danger" className="mb-3">
                            {error}
                        </Alert>
                    )}

                    <Form.Group className="mb-3">
                        <Form.Label>Theater Name *</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter theater name"
                            disabled={isSubmitting}
                            required
                        />
                        <Form.Text className="text-muted">
                            Unique name for the theater
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Theater Number *</Form.Label>
                        <Form.Control
                            type="number"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            placeholder="Enter theater number"
                            min="1"
                            disabled={isSubmitting}
                            required
                        />
                        <Form.Text className="text-muted">
                            Unique number identifier for the theater
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Capacity *</Form.Label>
                        <Form.Control
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            placeholder="Enter seating capacity"
                            min="1"
                            disabled={isSubmitting}
                            required
                        />
                        <Form.Text className="text-muted">
                            Maximum number of seats in the theater
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Theater Type *</Form.Label>
                        <Form.Select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            required
                        >
                            <option value="2D">2D</option>
                            <option value="3D">3D</option>
                            <option value="IMAX">IMAX</option>
                        </Form.Select>
                        <Form.Text className="text-muted">
                            Select the theater technology type
                        </Form.Text>
                    </Form.Group>
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
                            entity ? 'Update Theater' : 'Create Theater'
                        )}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
