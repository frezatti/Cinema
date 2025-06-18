import { useEffect, useState } from "react";
import { getAllMovies } from "@/features/movies/services/movieService";
import { getAllSessions } from "@/features/sessions/services/sessionService";
import { getAllTheaters } from "@/features/theater/services/theaterService";
import MovieSessionCard from "@/features/movies/components/MovieSessionCard";
import TicketModal from "@/features/tickets/components/ticketModal";
import { useTicketCreation } from "@/hooks/useTicketCreation";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {
        isModalOpen,
        selectedSession,
        ticketQuantity,
        handleQuantityChange,
        handlePurchase,
        openModal,
        closeModal,
    } = useTicketCreation();

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                const [moviesData, sessionsData, theatersData] = await Promise.all([
                    getAllMovies(),
                    getAllSessions(),
                    getAllTheaters(),
                ]);
                setMovies(moviesData);
                setSessions(sessionsData);
                setTheaters(theatersData);
                setError(null);
            } catch (err) {
                setError(
                    err.message || "Ocorreu um erro ao buscar os dados da página.",
                );
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    if (loading) {
        return <p className="text-center mt-5">Carregando filmes e sessões...</p>;
    }

    if (error) {
        return <p className="text-center mt-5 text-danger">{error}</p>;
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Filmes em Cartaz</h1>
            <div className="row g-4">
                {movies.length > 0 ? (
                    movies.map((movie) => {
                        const movieSessions = sessions.filter(
                            (session) => session.filmeId === movie.id,
                        );
                        return (
                            <div key={movie.id} className="col-12 col-md-6 col-lg-4">
                                <MovieSessionCard
                                    movie={movie}
                                    sessions={movieSessions}
                                    theaters={theaters}
                                    onPurchaseClick={openModal}
                                />
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center">Nenhum filme em exibição no momento.</p>
                )}
            </div>

            {selectedSession && (
                <TicketModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    session={selectedSession}
                    quantity={ticketQuantity}
                    onQuantityChange={handleQuantityChange}
                    onConfirm={handlePurchase}
                    theaters={theaters}
                    movies={movies}
                />
            )}
        </div>
    );
};

export default Home;
