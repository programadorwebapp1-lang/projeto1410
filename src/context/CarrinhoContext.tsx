'use client';
import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProdutoRemedio } from "../mockRemedios";

export interface CarrinhoItem {
  produto: ProdutoRemedio;
  quantidade: number;
}

interface Pedido {
  id: string;
  itens: CarrinhoItem[];
  nomeTutor: string;
  endereco: string;
  pagamento: string;
  total: number;
}

interface CarrinhoContextType {
  carrinho: CarrinhoItem[];
  adicionar: (produto: ProdutoRemedio) => void;
  remover: (produtoId: string) => void;
  alterarQuantidade: (produtoId: string, quantidade: number) => void;
  limpar: () => void;
  total: number;
  checkout: (nomeTutor: string, endereco: string, pagamento: string) => Pedido;
  pedidoConfirmado?: Pedido;
  setPedidoConfirmado: (pedido?: Pedido) => void;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export function useCarrinho() {
  const ctx = useContext(CarrinhoContext);
  if (!ctx) throw new Error("useCarrinho deve ser usado dentro do CarrinhoProvider");
  return ctx;
}

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);
  const [pedidoConfirmado, setPedidoConfirmado] = useState<Pedido | undefined>();

  const adicionar = (produto: ProdutoRemedio) => {
    setCarrinho((prev) => {
      const existe = prev.find((item) => item.produto.id === produto.id);
      if (existe) {
        return prev.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { produto, quantidade: 1 }];
    });
  };

  const remover = (produtoId: string) => {
    setCarrinho((prev) => prev.filter((item) => item.produto.id !== produtoId));
  };

  const alterarQuantidade = (produtoId: string, quantidade: number) => {
    setCarrinho((prev) =>
      prev.map((item) =>
        item.produto.id === produtoId ? { ...item, quantidade } : item
      ).filter((item) => item.quantidade > 0)
    );
  };

  const limpar = () => setCarrinho([]);

  const total = carrinho.reduce(
    (acc, item) => acc + item.produto.preco * item.quantidade,
    0
  );

  const checkout = (nomeTutor: string, endereco: string, pagamento: string): Pedido => {
    const pedido: Pedido = {
      id: Math.random().toString(36).substring(2, 10),
      itens: carrinho,
      nomeTutor,
      endereco,
      pagamento,
      total,
    };
    setPedidoConfirmado(pedido);
    limpar();
    return pedido;
  };

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionar,
        remover,
        alterarQuantidade,
        limpar,
        total,
        checkout,
        pedidoConfirmado,
        setPedidoConfirmado,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
