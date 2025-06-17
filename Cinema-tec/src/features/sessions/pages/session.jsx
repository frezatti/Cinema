import React from 'react';
import { EntityPage } from '@/components/entityPage';
import * as sessionService from '@/features/sessions/services/sessionService';
import { SessionModal } from '@/features/sessions/components/sessionModal';

export const Session = () => {

    const sessionColumns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Movie', accessor: 'movieId' },
        { header: 'Theater', accessor: 'theaterId' },
        {
            header: 'Session Time',
            accessor: 'dateTime',
            cell: (value) => new Date(value).toLocaleString()
        },
        {
            header: 'Price',
            accessor: 'price',
            cell: (value) => `$${parseFloat(value).toFixed(2)}`
        },
    ];

    return (
        <EntityPage
            entityName="Session"
            entityLabel="Sessions"
            service={sessionService}
            columns={sessionColumns}
            formComponent={SessionModal}
        />
    );
};
