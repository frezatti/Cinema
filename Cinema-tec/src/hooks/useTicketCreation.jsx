import { useState } from "react";
import { createTicket } from "@/features/tickets/services/ticketService";

export const useTicketCreation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const openModal = (session) => {
        setSelectedSession(session);
        setTicketQuantity(1);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedSession(null);
        setIsModalOpen(false);
        setError(null);
    };

    const handleQuantityChange = (event) => {
        const quantity = parseInt(event.target.value, 10);
        if (quantity > 0) {
            setTicketQuantity(quantity);
        }
    };

    const handlePurchase = async () => {
        if (!selectedSession || ticketQuantity <= 0) {
            setError("Sessão ou quantidade inválida.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const userId = 1;

            const ticketData = {
                sessaoId: selectedSession.id,
                usuarioId: userId,
                quantidade: ticketQuantity,
            };

            await createTicket(ticketData);
            alert("Ingresso comprado com sucesso!");
            closeModal();
        } catch (err) {
            setError(err.message || "Falha ao comprar o ingresso.");
            alert(`Erro: ${err.message || "Falha ao comprar o ingresso."}`);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isModalOpen,
        selectedSession,
        ticketQuantity,
        isLoading,
        error,
        openModal,
        closeModal,
        handleQuantityChange,
        handlePurchase,
    };
};
