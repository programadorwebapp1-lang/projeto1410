import React from "react";
import { ProdutoRemedio } from "../../mockRemedios";

interface Props {
  produto: ProdutoRemedio;
  onAdd: () => void;
}

export default function ProdutoCard({ produto, onAdd }: Props) {
  return (
    <div className="border rounded p-4 flex flex-col items-center bg-white shadow hover:shadow-lg transition">
      <img
        src={produto.foto}
        alt={produto.nome}
        className="w-24 h-24 object-contain mb-2 rounded"
      />
      <span className="font-bold text-center">{produto.nome}</span>
      <span className="text-green-700 font-semibold">R$ {produto.preco.toFixed(2)}</span>
      <span className="text-xs text-gray-500 mb-1">{produto.indicacao}</span>
      {produto.labels && (
        <div className="flex flex-wrap gap-1 mb-1">
          {produto.labels.map((label) => (
            <span
              key={label}
              className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5"
            >
              {label}
            </span>
          ))}
        </div>
      )}
      <button
        className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={onAdd}
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}
