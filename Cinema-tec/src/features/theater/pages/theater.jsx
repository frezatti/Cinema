import React from 'react';
import { EntityPage } from '../../../components/EntityPage';
import * as theaterService from '../services/theaterService';
import { TheaterModal } from '../components/theaterModal';

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
