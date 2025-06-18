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
                setError(null);

                const [moviesData, sessionsData, theatersData] = await Promise.all([
                    getAllMovies(),
                    getAllSessions(),
                    getAllTheaters(),
                ]);

                // Normalize movie data to handle both English and Portuguese properties
                const normalizedMovies = moviesData.map((movie) => ({
                    id: movie.id,
                    titulo: movie.titulo || movie.title || "",
                    descricao: movie.descricao || movie.description || "",
                    imagem: movie.imagem || movie.poster || "",
                    // Keep original properties for compatibility
                    ...movie,
                }));

                setMovies(normalizedMovies);
                setSessions(sessionsData);
                setTheaters(theatersData);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(
                    err.message || "Ocorreu um erro ao buscar os dados da página."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                    <p className="mt-2">Carregando filmes e sessões...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger text-center" role="alert">
                    <h4 className="alert-heading">Erro!</h4>
                    <p>{error}</p>
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => window.location.reload()}
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Filmes em Cartaz</h1>
            <div className="row g-4">
                {movies.length > 0 ? (
                    movies.map((movie) => {
                        const movieSessions = sessions.filter(
                            (session) =>
                                String(session.filmeId) === String(movie.id) ||
                                String(session.movieId) === String(movie.id)
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
                    <div className="col-12">
                        <div className="alert alert-info text-center">
                            <h4>Nenhum filme em exibição</h4>
                            <p>Não há filmes disponíveis no momento.</p>
                        </div>
                    </div>
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
