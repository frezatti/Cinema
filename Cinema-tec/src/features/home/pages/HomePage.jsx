import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Spinner, Alert, Form, InputGroup, Button, Badge } from 'react-bootstrap';
import * as movieService from '@/features/movies/services/movieService';
import * as sessionService from '@/features/sessions/services/sessionService';
import * as theaterService from '@/features/theater/services/theaterService';
import { MovieSessionCard } from '@/features/movies/components/MovieSessionCard';

export const Home = () => {
    const [movies, setMovies] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [autoRefresh, setAutoRefresh] = useState(true);

    // Auto-refresh functionality
    const fetchAllData = useCallback(async () => {
        try {
            setLoading(true);
            const [moviesRes, sessionsRes, theatersRes] = await Promise.all([
                movieService.getAllMovies(),
                sessionService.getAll(),
                theaterService.getAll()
            ]);

            setMovies(moviesRes.data || []);
            setSessions(sessionsRes.data || []);
            setTheaters(theatersRes.data || []);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch page data:", err);
            setError("Não foi possível carregar os filmes e sessões. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    useEffect(() => {
        if (!autoRefresh) return;

        const interval = setInterval(() => {
            fetchAllData();
        }, 30000);

        return () => clearInterval(interval);
    }, [autoRefresh, fetchAllData]);

    const handleRefresh = () => {
        fetchAllData();
    };

    const uniqueGenres = [...new Set(movies.map(movie => movie.genre))].filter(Boolean);

    const filteredAndSortedMovies = movies
        .filter(movie => {
            const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                movie.genre.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGenre = !selectedGenre || movie.genre === selectedGenre;
            return matchesSearch && matchesGenre;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'genre':
                    return a.genre.localeCompare(b.genre);
                case 'releaseDate':
                    return new Date(b.releaseDate) - new Date(a.releaseDate);
                case 'sessions':
                    const aSessionCount = sessions.filter(s => s.movieId === a.id).length;
                    const bSessionCount = sessions.filter(s => s.movieId === b.id).length;
                    return bSessionCount - aSessionCount;
                default:
                    return 0;
            }
        });

    // Get movies with sessions for display
    const moviesWithSessions = filteredAndSortedMovies.map(movie => ({
        ...movie,
        sessionCount: sessions.filter(session => session.movieId === movie.id).length
    }));

    if (loading && movies.length === 0) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="text-center">
                    <Spinner animation="border" role="status" className="mb-3">
                        <span className="visually-hidden">Carregando...</span>
                    </Spinner>
                    <p className="text-muted">Carregando filmes em cartaz...</p>
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="my-4">
                <Alert variant="danger" className="d-flex justify-content-between align-items-center">
                    <div>
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        {error}
                    </div>
                    <Button variant="outline-danger" size="sm" onClick={handleRefresh}>
                        <i className="bi bi-arrow-clockwise me-1"></i>
                        Tentar Novamente
                    </Button>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="my-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="mb-2">🎬 Em Cartaz</h1>
                    <p className="text-muted mb-0">
                        {moviesWithSessions.length} filme{moviesWithSessions.length !== 1 ? 's' : ''} disponível
                        {moviesWithSessions.length !== 1 ? 'eis' : ''} • {sessions.length} sessão{sessions.length !== 1 ? 'ões' : ''} programada{sessions.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <div className="d-flex gap-2">
                    <Form.Check
                        type="switch"
                        id="auto-refresh-switch"
                        label="Auto-atualizar"
                        checked={autoRefresh}
                        onChange={(e) => setAutoRefresh(e.target.checked)}
                        className="me-3"
                    />
                    <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={loading}
                    >
                        <i className={`bi bi-arrow-clockwise me-1 ${loading ? 'spin' : ''}`}></i>
                        Atualizar
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <Row className="mb-4">
                <Col md={4}>
                    <InputGroup>
                        <InputGroup.Text>
                            <i className="bi bi-search"></i>
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Buscar filmes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col md={3}>
                    <Form.Select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        <option value="">Todos os gêneros</option>
                        {uniqueGenres.map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={3}>
                    <Form.Select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="title">Ordenar por Título</option>
                        <option value="genre">Ordenar por Gênero</option>
                        <option value="releaseDate">Ordenar por Lançamento</option>
                        <option value="sessions">Ordenar por Nº de Sessões</option>
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <div className="text-end">
                        <Badge bg="info" className="fs-6">
                            {moviesWithSessions.length} resultado{moviesWithSessions.length !== 1 ? 's' : ''}
                        </Badge>
                    </div>
                </Col>
            </Row>

            {/* Loading overlay for refresh */}
            {loading && movies.length > 0 && (
                <div className="position-fixed top-50 end-0 translate-middle-y me-3" style={{ zIndex: 1050 }}>
                    <div className="bg-primary text-white px-3 py-2 rounded shadow">
                        <Spinner animation="border" size="sm" className="me-2" />
                        Atualizando...
                    </div>
                </div>
            )}

            {/* Movies Grid */}
            {moviesWithSessions.length > 0 ? (
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                    {moviesWithSessions.map(movie => {
                        const movieSessions = sessions.filter(session => session.movieId === movie.id);
                        return (
                            <Col key={movie.id}>
                                <MovieSessionCard
                                    movie={movie}
                                    sessions={movieSessions}
                                    theaters={theaters}
                                />
                            </Col>
                        );
                    })}
                </Row>
            ) : (
                <div className="text-center py-5">
                    <div className="mb-4">
                        <i className="bi bi-film display-1 text-muted"></i>
                    </div>
                    <h3 className="text-muted mb-3">Nenhum filme encontrado</h3>
                    <p className="text-muted mb-4">
                        {searchTerm || selectedGenre
                            ? 'Tente ajustar os filtros de busca.'
                            : 'Não há filmes em cartaz no momento.'}
                    </p>
                    {(searchTerm || selectedGenre) && (
                        <Button
                            variant="outline-primary"
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedGenre('');
                            }}
                        >
                            Limpar Filtros
                        </Button>
                    )}
                </div>
            )}

            {/* Last update info */}
            <div className="text-center text-muted mt-4 pt-3 border-top">
                <small>
                    <i className="bi bi-clock me-1"></i>
                    Última atualização: {new Date().toLocaleString('pt-BR')}
                    {autoRefresh && (
                        <span className="ms-2">
                            • <i className="bi bi-arrow-clockwise me-1"></i>
                            Atualização automática ativada
                        </span>
                    )}
                </small>
            </div>
        </Container>
    );
};
