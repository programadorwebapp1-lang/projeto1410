import React, { useState } from "react";
import { useCarrinho } from "../../context/CarrinhoContext";

export default function CarrinhoDrawer() {
  const {
    carrinho,
    remover,
    alterarQuantidade,
    total,
    limpar,
    checkout,
    pedidoConfirmado,
    setPedidoConfirmado,
  } = useCarrinho();
  const [aberto, setAberto] = useState(false);
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [form, setForm] = useState({ nome: "", endereco: "", pagamento: "Pix" });
  const [pedidoId, setPedidoId] = useState<string | null>(null);

  function handleFinalizar() {
    setCheckoutMode(true);
  }
  function handleConfirmar(e: React.FormEvent) {
    e.preventDefault();
    const pedido = checkout(form.nome, form.endereco, form.pagamento);
    setPedidoId(pedido.id);
    setCheckoutMode(false);
  }
  function handleFechar() {
    setAberto(false);
    setCheckoutMode(false);
    setPedidoId(null);
    setPedidoConfirmado(undefined);
  }

  return (
    <>
      <button
        className="relative"
        onClick={() => setAberto((a) => !a)}
        aria-label="Abrir carrinho"
      >
        <span className="material-icons text-3xl">shopping_cart</span>
        {carrinho.length > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
            {carrinho.reduce((acc, item) => acc + item.quantidade, 0)}
          </span>
        )}
      </button>
      {aberto && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={handleFechar} />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          aberto ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Carrinho lateral"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Carrinho</h2>
          <button onClick={handleFechar} aria-label="Fechar">✕</button>
        </div>
        {pedidoId ? (
          <div className="p-4 flex flex-col items-center">
            <span className="text-green-600 font-bold text-xl mb-2">Pedido confirmado!</span>
            <span className="text-sm">ID do pedido: <b>{pedidoId}</b></span>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleFechar}>Fechar</button>
          </div>
        ) : checkoutMode ? (
          <form className="p-4 flex flex-col gap-2" onSubmit={handleConfirmar}>
            <label>
              Nome do tutor
              <input
                className="border rounded w-full p-1"
                required
                value={form.nome}
                onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
              />
            </label>
            <label>
              Endereço
              <input
                className="border rounded w-full p-1"
                required
                value={form.endereco}
                onChange={e => setForm(f => ({ ...f, endereco: e.target.value }))}
              />
            </label>
            <label>
              Forma de pagamento
              <select
                className="border rounded w-full p-1"
                value={form.pagamento}
                onChange={e => setForm(f => ({ ...f, pagamento: e.target.value }))}
              >
                <option>Pix</option>
                <option>Cartão de Crédito</option>
                <option>Dinheiro</option>
              </select>
            </label>
            <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded" type="submit">
              Confirmar Pedido
            </button>
          </form>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4">
              {carrinho.length === 0 ? (
                <span className="text-gray-500">Seu carrinho está vazio.</span>
              ) : (
                <ul className="space-y-4">
                  {carrinho.map((item) => (
                    <li key={item.produto.id} className="flex items-center gap-2">
                      <img src={item.produto.foto} alt={item.produto.nome} className="w-12 h-12 rounded" />
                      <div className="flex-1">
                        <span className="font-semibold">{item.produto.nome}</span>
                        <div className="text-xs text-gray-500">R$ {item.produto.preco.toFixed(2)}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <button
                            className="px-2 py-0.5 bg-gray-200 rounded"
                            onClick={() => alterarQuantidade(item.produto.id, item.quantidade - 1)}
                            disabled={item.quantidade === 1}
                          >-</button>
                          <span className="px-2">{item.quantidade}</span>
                          <button
                            className="px-2 py-0.5 bg-gray-200 rounded"
                            onClick={() => alterarQuantidade(item.produto.id, item.quantidade + 1)}
                          >+</button>
                        </div>
                      </div>
                      <button
                        className="text-red-500 ml-2"
                        onClick={() => remover(item.produto.id)}
                        aria-label="Remover"
                      >
                        🗑️
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="border-t p-4">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              <button
                className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
                disabled={carrinho.length === 0}
                onClick={handleFinalizar}
              >
                Finalizar compra
              </button>
              <button
                className="mt-2 w-full px-4 py-2 bg-gray-200 text-gray-700 rounded"
                onClick={limpar}
                disabled={carrinho.length === 0}
              >
                Limpar carrinho
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
