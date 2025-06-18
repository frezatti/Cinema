import { useState } from "react";
import { createTicket } from "@/features/tickets/services/ticketService";

export const useTicketCreation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    // Ticket form data
    const [ticketData, setTicketData] = useState({
        quantity: 1,
        customerName: '',
        cpf: '',
        seat: '',
        paymentType: 'credit'
    });

    const openModal = (session) => {
        setSelectedSession(session);
        setTicketData({
            quantity: 1,
            customerName: '',
            cpf: '',
            seat: '',
            paymentType: 'credit'
        });
        setError(null);
        setIsSuccess(false);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedSession(null);
        setIsModalOpen(false);
        setError(null);
        setIsSuccess(false);
        setTicketData({
            quantity: 1,
            customerName: '',
            cpf: '',
            seat: '',
            paymentType: 'credit'
        });
    };

    const handleInputChange = (field, value) => {
        setTicketData(prev => ({
            ...prev,
            [field]: value
        }));
        setError(null); // Clear errors when user types
    };

    const handleQuantityChange = (event) => {
        const quantity = parseInt(event.target.value, 10);
        if (quantity > 0) {
            handleInputChange('quantity', quantity);
        }
    };

    const validateTicketData = () => {
        if (!ticketData.customerName.trim()) {
            throw new Error('Nome do cliente é obrigatório');
        }

        if (!ticketData.seat.trim()) {
            throw new Error('Assento é obrigatório');
        }

        if (ticketData.cpf && !isValidCPF(ticketData.cpf)) {
            throw new Error('CPF inválido');
        }

        if (ticketData.quantity <= 0) {
            throw new Error('Quantidade deve ser maior que zero');
        }
    };

    const isValidCPF = (cpf) => {
        // Basic CPF validation (you can make this more robust)
        const cleanCPF = cpf.replace(/\D/g, '');
        return cleanCPF.length === 11;
    };

    const handlePurchase = async () => {
        if (!selectedSession) {
            setError("Nenhuma sessão selecionada.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Validate form data
            validateTicketData();

            // Create tickets (one for each quantity)
            const ticketPromises = [];
            for (let i = 0; i < ticketData.quantity; i++) {
                const ticketPayload = {
                    sessionId: selectedSession.id,
                    customerName: ticketData.customerName.trim(),
                    cpf: ticketData.cpf.trim() || null,
                    seat: `${ticketData.seat}-${i + 1}`, // Add suffix for multiple tickets
                    paymentType: ticketData.paymentType,
                    // userId can be null for guest purchases
                    userId: null
                };

                ticketPromises.push(createTicket(ticketPayload));
            }

            await Promise.all(ticketPromises);
            setIsSuccess(true);

        } catch (err) {
            console.error('Ticket purchase error:', err);
            setError(err.message || "Falha ao comprar o ingresso.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isModalOpen,
        selectedSession,
        ticketData,
        isLoading,
        error,
        isSuccess,
        openModal,
        closeModal,
        handleInputChange,
        handleQuantityChange,
        handlePurchase,
    };
};
