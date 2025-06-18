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

    return (
        <div className="card h-100 shadow-sm">
            <img
                src={movie.imagem}
                alt={`Pôster do filme ${movie.titulo}`}
                className="card-img-top"
                style={{ height: "450px", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.titulo}</h5>
                <p className="card-text text-muted flex-grow-1">{movie.descricao}</p>
                <h6 className="mt-3 mb-2">Sessões:</h6>
                {sessions.length > 0 ? (
                    <ul className="list-group list-group-flush">
                        {sessions.map((session) => {
                            const theater = theaters.find((t) => t.id === session.salaId);
                            return (
                                <li
                                    key={session.id}
                                    className="list-group-item d-flex flex-column"
                                >
                                    <div>
                                        <strong>Sala:</strong> {theater?.nome || "Não encontrada"}
                                        <br />
                                        <strong>Data e Hora:</strong> {formatDateTime(session.dataHora)}
                                        <br />
                                        <strong>Preço:</strong> {formatPrice(session.preco)}
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
