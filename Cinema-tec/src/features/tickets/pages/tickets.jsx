import React from 'react';
import { EntityPage } from '../../../components/EntityPage';
import * as ticketService from '../services/ticketService';
import { TicketModal } from '../components/ticketModal';

export const Tickets = () => {

    const ticketColumns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Session ID', accessor: 'session_id' },
        { header: 'Seat Number', accessor: 'seat_number' },
        {
            header: 'Purchase Time',
            accessor: 'purchase_time',
            cell: (value) => new Date(value).toLocaleString()
        }
    ];

    return (
        <EntityPage
            entityName="Ticket"
            entityLabel="Tickets"
            service={ticketService}
            columns={ticketColumns}
            formComponent={TicketModal}
        />
    );
};
