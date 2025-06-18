import React from "react";
import Button from "@/components/button";

const MovieSessionCard = ({ movie, sessions, theaters, onPurchaseClick }) => {
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

    const handleImageError = (e) => {
        e.target.src = "https://via.placeholder.com/300x450/cccccc/666666?text=Sem+Imagem";
    };

    const movieImage = movie.imagem || movie.poster || "";
    const movieTitle = movie.titulo || movie.title || "Título não disponível";
    const movieDescription = movie.descricao || movie.description || "Descrição não disponível";

    return (
        <div className="card h-100 shadow-sm">
            <div style={{ height: "450px", overflow: "hidden" }}>
                <img
                    src={movieImage || "https://via.placeholder.com/300x450/cccccc/666666?text=Sem+Imagem"}
                    alt={`Pôster do filme ${movieTitle}`}
                    className="card-img-top"
                    style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease"
                    }}
                    onError={handleImageError}
                    onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                    onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                />
            </div>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movieTitle}</h5>
                <p className="card-text text-muted flex-grow-1">
                    {movieDescription.length > 100
                        ? `${movieDescription.substring(0, 100)}...`
                        : movieDescription}
                </p>
                <h6 className="mt-3 mb-2">Sessões:</h6>
                {sessions.length > 0 ? (
                    <ul className="list-group list-group-flush">
                        {sessions.map((session) => {
                            const theater = theaters.find(
                                (t) => String(t.id) === String(session.salaId || session.theaterId)
                            );
                            return (
                                <li
                                    key={session.id}
                                    className="list-group-item d-flex flex-column"
                                >
                                    <div>
                                        <strong>Sala:</strong> {theater?.nome || theater?.name || "Não encontrada"}
                                        <br />
                                        <strong>Data e Hora:</strong> {formatDateTime(session.dataHora || session.dateTime)}
                                        <br />
                                        <strong>Preço:</strong> {formatPrice(session.preco || session.price)}
                                    </div>
                                    <Button
                                        className="btn-primary btn-sm mt-2 align-self-end"
                                        onClick={() => onPurchaseClick(session)}
                                    >
                                        Comprar Ingresso
                                    </Button>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="alert alert-warning mt-2 mb-0">
                        Nenhuma sessão disponível para este filme.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieSessionCard;
