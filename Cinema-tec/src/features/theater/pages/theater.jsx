import React from 'react';
import { EntityPage } from '@/components/entityPage';
import * as theaterService from '@/features/theater/services/theaterService';
import { TheaterModal } from '@/features/theater/components/theaterModal';

export const Theaters = () => {

    const theaterColumns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Number', accessor: 'number' },
        { header: 'Capacity', accessor: 'capacity' },
    ];

    return (
        <EntityPage
            entityName="Theater"
            entityLabel="Theaters"
            service={theaterService}
            columns={theaterColumns}
            formComponent={TheaterModal}
        />
    );
};
