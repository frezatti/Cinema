export default function Movies() {
    return (
        <main className="container">
            <header className="d-flex justify-content-between align-items-center my-4">
                <h2>Filmes</h2>
                <button id="btnNovo" className="btn btn-primary">
                    <i className="bi bi-plus-circle" /> Novo Filme
                </button>
            </header>

            <div className="row mb-4">
                <div className="col-md-8">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Digite o título do filme"
                            aria-label="Buscar filme"
                        />
                        <button className="btn btn-primary" type="button">
                            <i className="bi bi-search" /> Buscar
                        </button>
                    </div>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Título</th>
                            <th scope="col">Gênero</th>
                            <th scope="col">Classificação</th>
                            <th scope="col">Duração</th>
                            <th scope="col">Estreia</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody id="tabelaFilmes"></tbody>
                </table>
            </div>

            <div
                className="modal fade"
                id="idModalFilme"
                tabIndex="-1"
                aria-labelledby="idModalFilmeTitulo"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="idModalFilmeTitulo">
                                Cadastrar Novo Filme
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Fechar"
                                id="btnFecharModal"
                            />
                        </div>
                        <div className="modal-body">
                            <form id="formFilme">
                                <div className="mb-3">
                                    <label htmlFor="imagem" className="form-label">
                                        Imagem do Filme
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="form-control"
                                        id="imagem"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="titulo" className="form-label">
                                        Título
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="titulo"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descricao" className="form-label">
                                        Descrição
                                    </label>
                                    <textarea className="form-control" id="descricao" rows="3" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="genero" className="form-label">
                                        Gênero
                                    </label>
                                    <select className="form-select" id="genero" required>
                                        <option value="">Selecione um gênero</option>
                                        <option value="Ação">Ação</option>
                                        <option value="Aventura">Aventura</option>
                                        <option value="Comédia">Comédia</option>
                                        <option value="Drama">Drama</option>
                                        <option value="Ficção Científica">
                                            Ficção Científica
                                        </option>
                                        <option value="Romance">Romance</option>
                                        <option value="Terror">Terror</option>
                                        <option value="Suspense">Suspense</option>
                                        <option value="Animação">Animação</option>
                                        <option value="Documentário">Documentário</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="classificacao" className="form-label">
                                        Classificação Indicativa
                                    </label>
                                    <select className="form-select" id="classificacao" required>
                                        <option value="">Selecione a classificação</option>
                                        <option value="L">Livre</option>
                                        <option value="10">10 anos</option>
                                        <option value="12">12 anos</option>
                                        <option value="14">14 anos</option>
                                        <option value="16">16 anos</option>
                                        <option value="18">18 anos</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="duracao" className="form-label">
                                        Duração (minutos)
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="duracao"
                                        min="1"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dataEstreia" className="form-label">
                                        Data de Estreia
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="dataEstreia"
                                        required
                                    />
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
                                id="btnSalvarFilme"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="modalExcluirFilme"
                tabIndex="-1"
                aria-labelledby="modalExcluirFilmeLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalExcluirFilmeLabel">
                                Confirmar Exclusão
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Fechar"
                            />
                        </div>
                        <div className="modal-body">
                            <h5>Deseja realmente excluir este filme?</h5>
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
                                id="btnExcluirFilme"
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
