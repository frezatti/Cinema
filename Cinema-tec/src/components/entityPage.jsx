import React, { useState, useEffect, useMemo } from 'react';
import { Container, Button, Modal, InputGroup, Form, Row, Col, Alert } from 'react-bootstrap';
import { GenericDataTable } from '@/components/datatable';

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
    const [editingEntity, setEditingEntity] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await service.getAll();
            setData(data);
            setError(null);
        } catch (error) {
            console.error(`Failed to fetch ${entityLabel}:`, error);
            setError(`Could not load ${entityLabel} data.`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenFormModal = (item = null) => {
        setEditingEntity(item);
        setShowFormModal(true);
    };

    const handleCloseFormModal = () => {
        setShowFormModal(false);
        setEditingEntity(null);
    };

    const handleOpenDeleteModal = (item) => {
        setSelectedItem(item);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedItem(null);
    };

    const handleSave = async (itemData) => {
        try {
            const savePromise = editingEntity
                ? service.update(editingEntity.id, itemData)
                : service.create(itemData);

            await savePromise;
            fetchData();
            handleCloseFormModal();
        } catch (err) {
            console.error(`Failed to save ${entityName}:`, err);
            setError(`Failed to save ${entityName}. Please try again.`);
            throw err;
        }
    };

    const handleDelete = () => {
        if (selectedItem) {
            service.remove(selectedItem.id)
                .then(() => {
                    handleCloseDeleteModal();
                    fetchData();
                })
                .catch(err => {
                    console.error(`Failed to delete ${entityName}:`, err);
                    setError(`Failed to delete ${entityName}. Please try again.`);
                });
        }
    };

    const filteredData = useMemo(() => {
        if (!data || !searchTerm.trim()) return data || [];

        const searchTermLower = searchTerm.toLowerCase().trim();

        return data.filter(item => {
            return columns.some(column => {
                const value = item[column.accessor];
                return value && value.toString().toLowerCase().includes(searchTermLower);
            });
        });
    }, [data, searchTerm, columns]);

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    const tableColumns = [
        ...columns,
        {
            header: 'Actions',
            accessor: 'id',
            cell: (id, rowData) => (
                <div className="d-flex gap-2">
                    <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleOpenFormModal(rowData)}
                        title={`Edit ${entityName.toLowerCase()}`}
                    >
                        <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleOpenDeleteModal(rowData)}
                        title={`Delete ${entityName.toLowerCase()}`}
                    >
                        <i className="bi bi-trash-fill"></i>
                    </Button>
                </div>
            )
        }
    ];

    return (
        <Container>
            <header className="d-flex justify-content-between align-items-center my-4">
                <h2>{entityLabel}</h2>
                <Button variant="primary" onClick={() => handleOpenFormModal()}>
                    <i className="bi bi-plus-lg me-2"></i>
                    New {entityName}
                </Button>
            </header>

            {error && (
                <Alert variant="danger" onClose={() => setError(null)} dismissible>
                    {error}
                </Alert>
            )}

            <Row className="mb-4">
                <Col md={8}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder={`Search ${entityLabel.toLowerCase()}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={handleSearchKeyPress}
                        />
                        {searchTerm && (
                            <Button
                                variant="outline-secondary"
                                onClick={handleClearSearch}
                                title="Clear search"
                            >
                                <i className="bi bi-x-lg"></i>
                            </Button>
                        )}
                        <Button
                            variant="primary"
                            onClick={() => { }}
                            title="Search"
                        >
                            <i className="bi bi-search"></i>
                        </Button>
                    </InputGroup>
                </Col>
                <Col md={4} className="d-flex align-items-center">
                    <small className="text-muted">
                        {filteredData.length} of {data.length} {entityLabel.toLowerCase()} found
                    </small>
                </Col>
            </Row>

            {loading && (
                <div className="text-center py-4">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {!loading && !error && (
                <>
                    {filteredData.length === 0 && searchTerm ? (
                        <Alert variant="info">
                            No {entityLabel.toLowerCase()} found matching "{searchTerm}".
                            <Button
                                variant="link"
                                className="p-0 ms-2"
                                onClick={handleClearSearch}
                            >
                                Clear search
                            </Button>
                        </Alert>
                    ) : (
                        <GenericDataTable data={filteredData} columns={tableColumns} />
                    )}
                </>
            )}

            {FormComponent && (
                <FormComponent
                    show={showFormModal}
                    handleClose={handleCloseFormModal}
                    entity={editingEntity}
                    onSave={handleSave}
                />
            )}

            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedItem && (
                        <>
                            <h5>Are you sure you want to delete this {entityName.toLowerCase()}?</h5>
                            {(selectedItem.title || selectedItem.name) && (
                                <p className="mb-3">
                                    <strong>"{selectedItem.title || selectedItem.name}"</strong>
                                </p>
                            )}
                            <p className="text-danger mt-3">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                This action cannot be undone.
                            </p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete {entityName}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};
