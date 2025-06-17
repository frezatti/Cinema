export default function Theater() {
    return (
        <div className="container mt-4">
            <header className="d-flex justify-content-between align-items-center my-4">
                <h2>Salas</h2>
                <button id="btnNovo" className="btn btn-primary" type="button">
                    <i className="bi bi-plus-circle" /> Nova Sala
                </button>
            </header>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="input-group w-50">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Digite o nome da sala"
                        aria-label="Buscar sala"
                    />
                    <button className="btn btn-primary" type="button">
                        Buscar
                    </button>
                </div>
            </div>

            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Capacidade</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="tabelaSalas" />
            </table>

            <div
                className="modal fade"
                id="idModalSala"
                tabIndex="-1"
                aria-labelledby="idModalSalaTitulo"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <form id="formSala" className="modal-content" noValidate>
                        <div className="modal-header">
                            <h5 className="modal-title" id="idModalSalaTitulo">
                                Cadastrar Nova Sala
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Fechar"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="nome" className="form-label">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nome"
                                    required
                                    minLength="2"
                                    maxLength="50"
                                />
                                <div className="invalid-feedback">Informe um nome válido.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="capacidade" className="form-label">
                                    Capacidade
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="capacidade"
                                    required
                                    min="1"
                                    max="500"
                                />
                                <div className="invalid-feedback">
                                    Informe uma capacidade válida.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tipo" className="form-label">
                                    Tipo
                                </label>
                                <select className="form-select" id="tipo" required>
                                    <option value="">Selecione o tipo</option>
                                    <option value="2D">2D</option>
                                    <option value="3D">3D</option>
                                    <option value="IMAX">IMAX</option>
                                </select>
                                <div className="invalid-feedback">Selecione um tipo.</div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                id="btnFecharModal"
                            >
                                Cancelar
                            </button>
                            <button type="button" className="btn btn-primary" id="btnSalvarSala">
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div
                className="modal fade"
                id="modalExcluirSala"
                tabIndex="-1"
                aria-labelledby="modalExcluirSalaLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalExcluirSalaLabel">
                                Excluir Sala
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Fechar"
                            />
                        </div>
                        <div className="modal-body">
                            <h5>Deseja realmente excluir a sala?</h5>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button type="button" className="btn btn-danger" id="btnExcluirSala">
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
