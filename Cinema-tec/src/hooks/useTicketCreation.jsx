import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useTicketCreation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [preSelectedSessionId, setPreSelectedSessionId] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sessionId = params.get('sessionId');
        if (sessionId) {
            setPreSelectedSessionId(parseInt(sessionId));
        }
    }, [location]);

    const clearPreSelection = () => {
        setPreSelectedSessionId(null);
        // Remove sessionId from URL without navigation
        const params = new URLSearchParams(location.search);
        params.delete('sessionId');
        const newUrl = `${location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
        window.history.replaceState({}, '', newUrl);
    };

    return {
        preSelectedSessionId,
        clearPreSelection
    };
};

