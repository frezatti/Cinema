import React, { useState, useEffect, useMemo } from 'react';
import { Container, Button, Modal, InputGroup, Form } from 'react-bootstrap';
import { GenericDataTable } from './datatable';

export const EntityPage = ({
    entityName,
    entityLabel,
    service,
    columns,
    formComponent: FormComponent
}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchData = () => {
        setLoading(true);
        service.getAll()
            .then(response => {
                setData(response.data);
                setError(null);
            })
            .catch(error => {
                console.error(`Failed to fetch ${entityLabel}:`, error);
                setError(`Could not load ${entityLabel} data.`);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenFormModal = (item = null) => {
        setSelectedItem(item);
        setShowFormModal(true);
    };

    const handleCloseFormModal = () => {
        setShowFormModal(false);
        setSelectedItem(null);
    };

    const handleOpenDeleteModal = (item) => {
        setSelectedItem(item);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedItem(null);
    };

    const handleSave = (itemData) => {
        const savePromise = itemData.id
            ? service.update(itemData.id, itemData)
            : service.create(itemData);

        savePromise
            .then(() => {
                fetchData();
                handleCloseFormModal();
            })
            .catch(err => console.error(`Failed to save ${entityName}:`, err));
    };

    const handleDelete = () => {
        if (selectedItem) {
            service.remove(selectedItem.id)
                .then(() => {
                    handleCloseDeleteModal();
                    fetchData();
                })
                .catch(err => console.error(`Failed to delete ${entityName}:`, err));
        }
    };

    const filteredData = useMemo(() => {
        if (!data) return [];
        // Assuming the primary searchable field is 'name' or 'title'
        const searchableKey = columns.find(c => c.accessor === 'name' || c.accessor === 'title')?.accessor || 'id';
        return data.filter(item =>
            item[searchableKey]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm, columns]);


    const tableColumns = [
        ...columns,
        {
            header: 'Actions',
            accessor: 'id',
            cell: (id, rowData) => (
                <>
                    <Button variant="outline-primary" size="sm" onClick={() => handleOpenFormModal(rowData)} className="me-2">
                        Edit
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleOpenDeleteModal(rowData)}>
                        Delete
                    </Button>
                </>
            )
        }
    ];

    return (
        <Container>
            <header className="d-flex justify-content-between align-items-center my-4">
                <h2>{entityLabel}</h2>
                <Button variant="primary" onClick={() => handleOpenFormModal()}>
                    New {entityName}
                </Button>
            </header>

            <div className="row mb-4">
                <div className="col-md-8">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder={`Search by ${entityName} name or title`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </div>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && !error && (
                <GenericDataTable data={filteredData} columns={tableColumns} />
            )}

            {FormComponent && (
                <FormComponent
                    show={showFormModal}
                    handleClose={handleCloseFormModal}
                    entity={selectedItem}
                    onSave={handleSave}
                />
            )}

            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this {entityName}?
                    <p className="text-danger">This action cannot be undone.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
};
