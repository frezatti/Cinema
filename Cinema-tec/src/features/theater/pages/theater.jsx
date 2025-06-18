import React from 'react';
import { EntityPage } from '@/components/entityPage';
import * as theaterService from '@/features/theater/services/theaterService';
import { TheaterModal } from '@/features/theater/components/theaterModal';

export const Theater = () => {
    const theaterColumns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Name', accessor: 'name' },
        { header: 'Number', accessor: 'number' },
        {
            header: 'Capacity',
            accessor: 'capacity',
            cell: (capacity) => `${capacity} seats`
        },
        {
            header: 'Type',
            accessor: 'type',
            cell: (type) => (
                <span className={`badge ${type === 'IMAX' ? 'bg-primary' :
                        type === '3D' ? 'bg-success' : 'bg-secondary'
                    }`}>
                    {type}
                </span>
            )
        },
        {
            header: 'Created',
            accessor: 'createdAt',
            cell: (value) => {
                try {
                    return new Date(value).toLocaleDateString('en-US');
                } catch (e) {
                    return value;
                }
            }
        }
    ];

    const genericTheaterService = {
        getAll: theaterService.getAllTheaters,
        create: theaterService.createTheater,
        update: theaterService.updateTheater,
        remove: theaterService.deleteTheater,
    };

    return (
        <EntityPage
            entityName="Theater"
            entityLabel="Theaters"
            service={genericTheaterService}
            columns={theaterColumns}
            formComponent={TheaterModal}
        />
    );
};
