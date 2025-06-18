import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@/components/button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const TicketModal = ({
    isOpen,
    onClose,
    session,
    quantity,
    onQuantityChange,
    onConfirm,
    theaters,
    movies,
    isLoading,
    error,
    isSuccess,
}) => {
    if (!isOpen || !session) return null;

    const movie = movies.find((m) => m.id === session.filmeId);
    const theater = theaters.find((t) => t.id === session.salaId);

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

    const totalPrice = formatPrice(session.preco * quantity);

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Comprar Ingresso</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isSuccess ? (
                    <Alert variant="success">
                        <Alert.Heading>Compra realizada com sucesso!</Alert.Heading>
                        <p>
                            Seus ingressos para{" "}
                            <strong>{movie?.titulo || "este filme"}</strong> foram
                            confirmados.
                        </p>
                        <p>Aproveite a sessão!</p>
                    </Alert>
                ) : (
                    <>
                        <h5>{movie?.titulo || "Filme não encontrado"}</h5>
                        <p>
                            <strong>Sala:</strong> {theater?.nome || "Sala não encontrada"}
                            <br />
                            <strong>Data e Hora:</strong> {formatDateTime(session.dataHora)}
                            <br />
                            <strong>Preço unitário:</strong> {formatPrice(session.preco)}
                        </p>
                        <hr />
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">
                                Quantidade de Ingressos:
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                className="form-control"
                                value={quantity}
                                onChange={onQuantityChange}
                                min="1"
                                step="1"
                            />
                        </div>
                        <h5 className="text-end">Total: {totalPrice}</h5>
                    </>
                )}
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-secondary" onClick={onClose}>
                    {isSuccess ? "Fechar" : "Cancelar"}
                </Button>
                {!isSuccess && (
                    <Button
                        className="btn-primary"
                        onClick={onConfirm}
                        disabled={isLoading}
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
                                <span className="ms-2">Confirmando...</span>
                            </>
                        ) : (
                            "Confirmar Compra"
                        )}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default TicketModal;
