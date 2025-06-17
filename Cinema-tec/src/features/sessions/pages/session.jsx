export default function Session() {
    return (
        <main className="container">
            <header className="d-flex justify-content-between align-items-center my-4">
                <h2>Gerenciamento de Sessões</h2>
                <button id="btnNovo" className="btn btn-primary">
                    <i className="bi bi-plus-circle"></i> Nova Sessão
                </button>
            </header>

            <div className="row mb-4">
                <div className="col-md-8">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar sessão"
                            aria-label="Buscar sessão"
                        />
                        <button className="btn btn-primary" type="button">
                            <i className="bi bi-search"></i> Buscar
                        </button>
                    </div>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Filme</th>
                            <th scope="col">Sala</th>
                            <th scope="col">Data e Hora</th>
                            <th scope="col">Preço</th>
                            <th scope="col">Formato</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody id="tabelaSessoes"></tbody>
                </table>
            </div>

            <div
                className="modal fade"
                id="idModalSessao"
                tabIndex="-1"
                aria-labelledby="idModalSessaoTitulo"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="idModalSessaoTitulo">
                                Cadastrar Nova Sessão
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Fechar"
                                id="btnFecharModal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form id="formSessao">
                                <div className="mb-3">
                                    <label htmlFor="filme" className="form-label">Filme</label>
                                    <select className="form-select" id="filme" required>
                                        <option value="">Selecione um filme</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="sala" className="form-label">Sala</label>
                                    <select className="form-select" id="sala" required>
                                        <option value="">Selecione uma sala</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dataHora" className="form-label">Data e Hora</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        id="dataHora"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="preco" className="form-label">Preço</label>
                                    <div className="input-group">
                                        <span className="input-group-text">R$</span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="preco"
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="idioma" className="form-label">Idioma</label>
                                    <select className="form-select" id="idioma" required>
                                        <option value="">Selecione o idioma</option>
                                        <option value="Dublado">Dublado</option>
                                        <option value="Legendado">Legendado</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formato" className="form-label">Formato</label>
                                    <select className="form-select" id="formato" required>
                                        <option value="">Selecione o formato</option>
                                        <option value="2D">2D</option>
                                        <option value="3D">3D</option>
                                        <option value="IMAX">IMAX</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                id="btnSalvarSessao"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="modalExcluirSessao"
                tabIndex="-1"
                aria-labelledby="modalExcluirSessaoLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalExcluirSessaoLabel">
                                Confirmar Exclusão
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Fechar"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <h5>Deseja realmente excluir esta sessão?</h5>
                            <p className="text-danger">Esta ação não pode ser desfeita.</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                id="btnExcluirSessao"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
