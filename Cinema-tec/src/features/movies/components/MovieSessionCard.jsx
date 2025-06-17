import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieSessionCard = ({ movie, sessions, theaters }) => {

    const formatDateTime = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString('pt-BR', options);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    };

    const getTheaterName = (theaterId) => {
        const theater = theaters.find(t => t.id === theaterId);
        return theater ? theater.name || `Theater ${theater.number}` : 'Unknown Theater';
    };

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image || 'https://via.placeholder.com/150x220'} alt={`Poster for ${movie.title}`} />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.genre}</Card.Text>
                <h6 className="mt-3 mb-2">Sessions:</h6>
                {sessions.length > 0 ? (
                    <ListGroup variant="flush" className="flex-grow-1">
                        {sessions.map(session => (
                            <ListGroup.Item key={session.id} className="d-flex flex-column">
                                <div>
                                    <strong>Theater:</strong> {getTheaterName(session.theaterId)}<br />
                                    <strong>Time:</strong> {formatDateTime(session.dateTime)}<br />
                                    <strong>Price:</strong> {formatPrice(session.price)}
                                </div>
                                <Link to={`/tickets/new?sessionId=${session.id}`} className="btn btn-primary btn-sm mt-2 align-self-end">
                                    Buy Ticket
                                </Link>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <p className="text-muted">No sessions available for this movie.</p>
                )}
            </Card.Body>
        </Card>
    );
};
