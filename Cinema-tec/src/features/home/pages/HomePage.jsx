import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import * as movieService from '../features/movies/services/movieService';
import * as sessionService from '../features/sessions/services/sessionService';
import * as theaterService from '../features/theaters/services/theaterService';
import { MovieSessionCard } from '../features/movies/components/MovieSessionCard';

export const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                const [moviesRes, sessionsRes, theatersRes] = await Promise.all([
                    movieService.getAllMovies(),
                    sessionService.getAllSessions(),
                    theaterService.getAllTheaters()
                ]);
                setMovies(moviesRes.data);
                setSessions(sessionsRes.data);
                setTheaters(theatersRes.data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch page data:", err);
                setError("Could not load movies and sessions.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    if (loading) {
        return <p>Loading movies...</p>;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    return (
        <Container className="my-4">
            <h1 className="mb-4">Now Showing</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {movies.map(movie => {
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
        </Container>
    );
};
