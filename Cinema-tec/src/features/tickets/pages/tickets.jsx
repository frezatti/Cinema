export default function Tickets() {
    return (
        <main className="container">
            <header className="d-flex justify-content-between align-items-center my-4">
                <h2>Ingressos</h2>
                <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#modalVendaIngresso"
                >
                    <i className="bi bi-plus-circle" /> Comprar
                </button>
            </header>
            <hr />
            <div
                className="modal fade"
                id="modalVendaIngresso"
                tabIndex="-1"
                aria-labelledby="modalVendaIngressoLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalVendaIngressoLabel">
                                Venda de Ingressos
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Fechar"
                            />
                        </div>
                        <div className="modal-body">
                            <form id="formIngresso" noValidate>
                                <div className="mb-3">
                                    <label htmlFor="sessao" className="form-label">
                                        Sessão
                                    </label>
                                    <select className="form-select" id="sessao" required>
                                        <option value="">Selecione uma sessão</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nomeCliente" className="form-label">
                                        Nome do Cliente
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nomeCliente"
                                        required
                                        minLength="2"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cpf" className="form-label">
                                        CPF
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cpf"
                                        required
                                        pattern="\d{11}"
                                        placeholder="Somente números"
                                    />
                                    <div className="form-text">
                                        Digite 11 dígitos numéricos sem pontos ou traços.
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="assento" className="form-label">
                                        Assento
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="assento"
                                        required
                                        pattern="[A-Z]\d{1,2}"
                                        placeholder="Ex: A10"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tipoPagamento" className="form-label">
                                        Tipo de Pagamento
                                    </label>
                                    <select className="form-select" id="tipoPagamento" required>
                                        <option value="">Selecione o tipo de pagamento</option>
                                        <option value="Cartão">Cartão</option>
                                        <option value="Pix">Pix</option>
                                        <option value="Dinheiro">Dinheiro</option>
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
                                id="btnConfirmarVenda"
                            >
                                Confirmar Venda
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <h3>Ingressos Vendidos</h3>
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Filme</th>
                        <th>Sessão</th>
                        <th>Cliente</th>
                        <th>CPF</th>
                        <th>Assento</th>
                        <th>Pagamento</th>
                        <th>Data da Compra</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="tabelaIngressos" />
            </table>
        </main>
    );
}
