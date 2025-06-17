import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as sessionService from '../../sessions/services/sessionService';

export const TicketModal = ({ show, handleClose, entity, onSave }) => {
    const [formData, setFormData] = useState({});
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        // Fetch sessions for the dropdown
        sessionService.getAll().then(res => setSessions(res.data));

        // Initialize form with entity data or defaults
        setFormData(entity || { session_id: '', seat_number: '' });
    }, [entity]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            session_id: parseInt(formData.session_id)
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{entity ? 'Edit Ticket' : 'New Ticket'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Session</Form.Label>
                        <Form.Select name="session_id" value={formData.session_id || ''} onChange={handleChange} required>
                            <option value="">Select a Session</option>
                            {sessions.map(session => (
                                <option key={session.id} value={session.id}>
                                    {`ID: ${session.id} - ${new Date(session.session_time).toLocaleString()}`}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Seat Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="seat_number"
                            value={formData.seat_number || ''}
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
