import React from 'react';
import { Table } from 'react-bootstrap';

export const GenericDataTable = ({ data, columns }) => {
    if (!data || data.length === 0) {
        return <p>No data to display.</p>;
    }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.accessor}>{col.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {columns.map((col) => (
                            <td key={col.accessor}>
                                {/* If a custom cell renderer exists, use it. Otherwise, display the data directly. */}
                                {col.cell ? col.cell(item[col.accessor], item) : item[col.accessor]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};
