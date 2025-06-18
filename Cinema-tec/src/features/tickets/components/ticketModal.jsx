import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "@/components/button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import * as sessionService from '@/features/sessions/services/sessionService';
import * as theaterService from '@/features/theaters/services/theaterService';
import * as movieService from '@/features/movies/services/movieService';

const TicketModal = ({ show, handleClose, entity, onSave }) => {
    const [sessions, setSessions] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        sessionId: '',
        customerName: '',
        cpf: '',
        seatNumber: '',
        quantity: 1,
        paymentType: 'credit'
    });

    useEffect(() => {
        if (show) {
            loadData();

            if (entity) {
                setFormData({
                    sessionId: entity.sessionId || '',
                    customerName: entity.customerName || '',
                    cpf: entity.cpf || '',
                    seatNumber: entity.seatNumber || entity.seat_number || '',
                    quantity: entity.quantity || 1,
                    paymentType: entity.paymentType || 'credit'
                });
            } else {
                // Reset for new ticket
                setFormData({
                    sessionId: '',
                    customerName: '',
                    cpf: '',
                    seatNumber: '',
                    quantity: 1,
                    paymentType: 'credit'
                });
            }
        }
    }, [show, entity]);

    const loadData = async () => {
        try {
            const [sessionsData, theatersData, moviesData] = await Promise.all([
                sessionService.getAll(),
                theaterService.getAll(),
                movieService.getAll()
            ]);

            setSessions(sessionsData);
            setTheaters(theatersData);
            setMovies(moviesData);
        } catch (err) {
            setError('Failed to load session data');
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const selectedSession = sessions.find(s => s.id === formData.sessionId);
    const movie = selectedSession ? movies.find(m =>
        m.id === selectedSession.movieId || m.id === selectedSession.filmeId
    ) : null;
    const theater = selectedSession ? theaters.find(t =>
        t.id === selectedSession.theaterId || t.id === selectedSession.salaId
    ) : null;

    const formatDateTime = (dateTime) => {
        try {
            const d = new Date(dateTime);
            return `${d.toLocaleDateString("pt-BR")} ${d.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
            })}`;
        } catch {
            return dateTime;
        }
    };

    const formatPrice = (price) => {
        return Number(price).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    const sessionPrice = selectedSession?.price || selectedSession?.preco || 0;
    const sessionDateTime = selectedSession?.dateTime || selectedSession?.dataHora;
    const movieTitle = movie?.title || movie?.titulo || "Select a session";
    const theaterName = theater?.name || theater?.nome || "";
    const totalPrice = formatPrice(sessionPrice * formData.quantity);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const ticketData = {
                ...formData,
                purchaseTime: new Date().toISOString()
            };

            await onSave(ticketData);
            setIsSuccess(true);

            setTimeout(() => {
                handleClose();
                setIsSuccess(false);
                setError('');
            }, 1500);
        } catch (err) {
            setError(err.message || 'Failed to save ticket');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {entity ? 'Edit Ticket' : 'New Ticket'}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {isSuccess ? (
                        <Alert variant="success">
                            <Alert.Heading>🎉 Ticket saved successfully!</Alert.Heading>
                            <p>The ticket has been {entity ? 'updated' : 'created'} successfully.</p>
                        </Alert>
                    ) : (
                        <>
                            {/* Session Selection */}
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Session *</Form.Label>
                                        <Form.Select
                                            value={formData.sessionId}
                                            onChange={(e) => handleInputChange('sessionId', e.target.value)}
                                            required
                                            disabled={isLoading}
                                        >
                                            <option value="">Select a session</option>
                                            {sessions.map(session => {
                                                const sessionMovie = movies.find(m =>
                                                    m.id === session.movieId || m.id === session.filmeId
                                                );
                                                const sessionTheater = theaters.find(t =>
                                                    t.id === session.theaterId || t.id === session.salaId
                                                );
                                                const sessionTime = formatDateTime(session.dateTime || session.dataHora);

                                                return (
                                                    <option key={session.id} value={session.id}>
                                                        {sessionMovie?.title || sessionMovie?.titulo} - {sessionTheater?.name || sessionTheater?.nome} - {sessionTime}
                                                    </option>
                                                );
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Session Information */}
                            {selectedSession && (
                                <div className="mb-4 p-3 bg-light rounded">
                                    <h6 className="mb-3">{movieTitle}</h6>
                                    <Row>
                                        <Col md={6}>
                                            <p className="mb-1">
                                                <strong>Theater:</strong> {theaterName}
                                            </p>
                                            <p className="mb-1">
                                                <strong>Date & Time:</strong> {formatDateTime(sessionDateTime)}
                                            </p>
                                        </Col>
                                        <Col md={6}>
                                            <p className="mb-1">
                                                <strong>Price per ticket:</strong> {formatPrice(sessionPrice)}
                                            </p>
                                            <p className="mb-1">
                                                <strong>Format:</strong> {selectedSession.format || selectedSession.formato || 'N/A'}
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                            )}

                            {/* Customer Information */}
                            <h6 className="mb-3">Customer Information</h6>
                            <Row className="mb-3">
                                <Col md={8}>
                                    <Form.Group>
                                        <Form.Label>Full Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={formData.customerName}
                                            onChange={(e) => handleInputChange('customerName', e.target.value)}
                                            placeholder="Enter full name"
                                            required
                                            disabled={isLoading}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>CPF (optional)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={formData.cpf}
                                            onChange={(e) => handleInputChange('cpf', e.target.value)}
                                            placeholder="000.000.000-00"
                                            disabled={isLoading}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Seat Number *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={formData.seatNumber}
                                            onChange={(e) => handleInputChange('seatNumber', e.target.value)}
                                            placeholder="Ex: A1, B5"
                                            required
                                            disabled={isLoading}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Quantity *</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={formData.quantity}
                                            onChange={(e) => handleInputChange('quantity', parseInt(e.target.value))}
                                            min="1"
                                            max="10"
                                            required
                                            disabled={isLoading}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Payment Method *</Form.Label>
                                        <Form.Select
                                            value={formData.paymentType}
                                            onChange={(e) => handleInputChange('paymentType', e.target.value)}
                                            required
                                            disabled={isLoading}
                                        >
                                            <option value="credit">Credit Card</option>
                                            <option value="debit">Debit Card</option>
                                            <option value="cash">Cash</option>
                                            <option value="pix">PIX</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Total */}
                            {selectedSession && (
                                <div className="text-end mt-4">
                                    <h5 className="text-primary">Total: {totalPrice}</h5>
                                </div>
                            )}
                        </>
                    )}

                    {error && (
                        <Alert variant="danger" className="mt-3">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            {error}
                        </Alert>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        className="btn-secondary"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        {isSuccess ? "Close" : "Cancel"}
                    </Button>
                    {!isSuccess && (
                        <Button
                            className="btn-primary"
                            type="submit"
                            disabled={isLoading || !formData.sessionId || !formData.customerName.trim() || !formData.seatNumber.trim()}
                        >
                            {isLoading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    <span className="ms-2">Saving...</span>
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-lg me-2"></i>
                                    {entity ? 'Update' : 'Create'} Ticket
                                </>
                            )}
                        </Button>
                    )}
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default TicketModal;
