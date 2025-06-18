import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Alert, Badge } from 'react-bootstrap';
import * as sessionService from '@/features/sessions/services/sessionService';
import * as movieService from '@/features/movies/services/movieService';
import * as theaterService from '@/features/theater/services/theaterService';

export const TicketModal = ({ show, handleClose, entity, onSave, preSelectedSessionId }) => {
    const [formData, setFormData] = useState({});
    const [sessions, setSessions] = useState([]);
    const [movies, setMovies] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [sessionsRes, moviesRes, theatersRes] = await Promise.all([
                    sessionService.getAll(),
                    movieService.getAllMovies(),
                    theaterService.getAll()
                ]);

                setSessions(sessionsRes.data || []);
                setMovies(moviesRes.data || []);
                setTheaters(theatersRes.data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (show) {
            fetchData();
        }
    }, [show]);

    useEffect(() => {
        const initialData = entity || {
            customerName: '',
            cpf: '',
            seat: '',
            paymentType: 'credit_card',
            sessionId: preSelectedSessionId || '',
        };

        setFormData(initialData);

        if (preSelectedSessionId) {
            const session = sessions.find(s => s.id === preSelectedSessionId);
            setSelectedSession(session);
        }
    }, [entity, preSelectedSessionId, sessions]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear errors when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }

        // Handle session selection
        if (name === 'sessionId') {
            const session = sessions.find(s => s.id === parseInt(value));
            setSelectedSession(session);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.customerName?.trim()) {
            newErrors.customerName = 'Nome é obrigatório';
        }

        if (!formData.seat?.trim()) {
            newErrors.seat = 'Assento é obrigatório';
        }

        if (!formData.sessionId) {
            newErrors.sessionId = 'Sessão é obrigatória';
        }

        if (formData.cpf && !/^\d{11}$/.test(formData.cpf.replace(/\D/g, ''))) {
            newErrors.cpf = 'CPF deve ter 11 dígitos';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const ticketData = {
            ...formData,
            sessionId: parseInt(formData.sessionId),
            cpf: formData.cpf.replace(/\D/g, '') || null
        };

        onSave(ticketData);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getMovieName = (movieId) => {
        const movie = movies.find(m => m.id === movieId);
        return movie ? movie.title : 'Filme não encontrado';
    };

    const getTheaterName = (theaterId) => {
        const theater = theaters.find(t => t.id === theaterId);
        return theater ? (theater.name || `Theater ${theater.number}`) : 'Theater não encontrado';
    };

    const formatCPF = (value) => {
        const numbers = value.replace(/\D/g, '');
        return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const handleCPFChange = (e) => {
        const formatted = formatCPF(e.target.value);
        setFormData(prev => ({ ...prev, cpf: formatted }));
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {entity ? 'Editar Ingresso' : 'Novo Ingresso'}
                    {preSelectedSessionId && (
                        <Badge bg="info" className="ms-2">Sessão Pré-selecionada</Badge>
                    )}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {loading && (
                        <Alert variant="info">
                            <i className="bi bi-hourglass-split me-2"></i>
                            Carregando dados...
                        </Alert>
                    )}

                    {/* Session Selection */}
                    <Form.Group className="mb-3">
                        <Form.Label>Sessão *</Form.Label>
                        <Form.Select
                            name="sessionId"
                            value={formData.sessionId || ''}
                            onChange={handleChange}
                            required
                            isInvalid={!!errors.sessionId}
                            disabled={!!preSelectedSessionId}
                        >
                            <option value="">Selecione uma sessão</option>
                            {sessions.map(session => (
                                <option key={session.id} value={session.id}>
                                    {getMovieName(session.movieId)} - {getTheaterName(session.theaterId)} - {formatDateTime(session.dateTime)} - {formatPrice(session.price)}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.sessionId}
                        </Form.Control.Feedback>
                        {preSelectedSessionId && (
                            <Form.Text className="text-muted">
                                Esta sessão foi selecionada automaticamente da página inicial.
                            </Form.Text>
                        )}
                    </Form.Group>

                    {/* Session Details */}
                    {selectedSession && (
                        <Alert variant="light" className="mb-3">
                            <h6 className="mb-2">
                                <i className="bi bi-info-circle me-2"></i>
                                Detalhes da Sessão
                            </h6>
                            <Row>
                                <Col md={6}>
                                    <strong>Filme:</strong> {getMovieName(selectedSession.movieId)}<br />
                                    <strong>Cinema:</strong> {getTheaterName(selectedSession.theaterId)}<br />
                                    <strong>Data/Hora:</strong> {formatDateTime(selectedSession.dateTime)}
                                </Col>
                                <Col md={6}>
                                    <strong>Idioma:</strong> {selectedSession.language}<br />
                                    <strong>Formato:</strong> {selectedSession.format}<br />
                                    <strong>Preço:</strong> <span className="text-success fw-bold">{formatPrice(selectedSession.price)}</span>
                                </Col>
                            </Row>
                        </Alert>
                    )}

                    {/* Customer Information */}
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome do Cliente *</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="customerName"
                                    value={formData.customerName || ''}
                                    onChange={handleChange}
                                    required
                                    isInvalid={!!errors.customerName}
                                    placeholder="Digite o nome completo"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.customerName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>CPF (Opcional)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cpf"
                                    value={formData.cpf || ''}
                                    onChange={handleCPFChange}
                                    isInvalid={!!errors.cpf}
                                    placeholder="000.000.000-00"
                                    maxLength="14"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.cpf}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Assento *</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="seat"
                                    value={formData.seat || ''}
                                    onChange={handleChange}
                                    required
                                    isInvalid={!!errors.seat}
                                    placeholder="Ex: A12, B05, C10"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.seat}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Tipo de Pagamento</Form.Label>
                                <Form.Select
                                    name="paymentType"
                                    value={formData.paymentType || 'credit_card'}
                                    onChange={handleChange}
                                >
                                    <option value="credit_card">Cartão de Crédito</option>
                                    <option value="debit_card">Cartão de Débito</option>
                                    <option value="cash">Dinheiro</option>
                                    <option value="pix">PIX</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Price Summary */}
                    {selectedSession && (
                        <Alert variant="success" className="mb-0">
                            <Row>
                                <Col>
                                    <strong>Total a Pagar:</strong> {formatPrice(selectedSession.price)}
                                </Col>
                            </Row>
                        </Alert>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" disabled={loading || !selectedSession}>
                        <i className="bi bi-check-circle me-2"></i>
                        {entity ? 'Atualizar' : 'Criar'} Ingresso
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

// services/ticketService.js
import api from '@/services/api';

export const ticketService = {
    // Create a new ticket
    create: async (ticketData) => {
        try {
            const response = await api.post('/tickets', ticketData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao criar ingresso');
        }
    },

    // Get all tickets
    getAll: async () => {
        try {
            const response = await api.get('/tickets');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao carregar ingressos');
        }
    },

    // Get ticket by ID
    getById: async (id) => {
        try {
            const response = await api.get(`/tickets/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao carregar ingresso');
        }
    },

    // Update ticket
    update: async (id, ticketData) => {
        try {
            const response = await api.put(`/tickets/${id}`, ticketData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao atualizar ingresso');
        }
    },

    // Delete ticket
    delete: async (id) => {
        try {
            const response = await api.delete(`/tickets/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao deletar ingresso');
        }
    },

    // Get tickets by session
    getBySession: async (sessionId) => {
        try {
            const response = await api.get(`/tickets/session/${sessionId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao carregar ingressos da sessão');
        }
    }
};

// pages/TicketsPage.jsx - Example usage
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Alert } from 'react-bootstrap';
import { EnhancedTicketModal } from '@/components/EnhancedTicketModal';
import { useTicketCreation } from '@/hooks/useTicketCreation';
import { ticketService } from '@/services/ticketService';

export const TicketsPage = () => {
    const [tickets, setTickets] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { preSelectedSessionId, clearPreSelection } = useTicketCreation();

    // Auto-open modal if sessionId is in URL
    useEffect(() => {
        if (preSelectedSessionId) {
            setShowModal(true);
        }
    }, [preSelectedSessionId]);

    const loadTickets = async () => {
        try {
            setLoading(true);
            const response = await ticketService.getAll();
            setTickets(response.data || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTickets();
    }, []);

    const handleSaveTicket = async (ticketData) => {
        try {
            if (selectedTicket) {
                await ticketService.update(selectedTicket.id, ticketData);
            } else {
                await ticketService.create(ticketData);
            }

            await loadTickets();
            setShowModal(false);
            setSelectedTicket(null);
            clearPreSelection(); // Clear URL parameter after successful creation
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEditTicket = (ticket) => {
        setSelectedTicket(ticket);
        setShowModal(true);
    };

    const handleDeleteTicket = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este ingresso?')) {
            try {
                await ticketService.delete(id);
                await loadTickets();
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTicket(null);
        clearPreSelection(); // Clear URL parameter when modal is closed
    };

    return (
        <Container fluid>
            <Row className="mb-4">
                <Col>
                    <h2>Gestão de Ingressos</h2>
                    <Button
                        variant="primary"
                        onClick={() => setShowModal(true)}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Novo Ingresso
                    </Button>
                </Col>
            </Row>

            {error && (
                <Alert variant="danger" dismissible onClose={() => setError('')}>
                    {error}
                </Alert>
            )}

            <Row>
                <Col>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Assento</th>
                                <th>Sessão</th>
                                <th>Pagamento</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map(ticket => (
                                <tr key={ticket.id}>
                                    <td>{ticket.id}</td>
                                    <td>{ticket.customerName}</td>
                                    <td>{ticket.seat}</td>
                                    <td>#{ticket.sessionId}</td>
                                    <td>{ticket.paymentType}</td>
                                    <td>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleEditTicket(ticket)}
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDeleteTicket(ticket.id)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <EnhancedTicketModal
                show={showModal}
                handleClose={handleCloseModal}
                entity={selectedTicket}
                onSave={handleSaveTicket}
                preSelectedSessionId={preSelectedSessionId}
            />
        </Container>
    );
};
