import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export const TheaterModal = ({ show, handleClose, entity, onSave }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData(entity || { number: '', capacity: '' });
    }, [entity]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{entity ? 'Edit Theater' : 'New Theater'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Theater Number</Form.Label>
                        <Form.Control
                            type="number"
                            name="number"
                            value={formData.number || ''}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Capacity</Form.Label>
                        <Form.Control
                            type="number"
                            name="capacity"
                            value={formData.capacity || ''}
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
