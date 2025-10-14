// Página principal da loja de remédios

"use client";
import React, { useState, useMemo } from "react";
import { remedios, CategoriaRemedio } from "../../mockRemedios";
import FiltroCategorias from "../../components/remedios/FiltroCategorias";
import ProdutoCard from "../../components/remedios/ProdutoCard";
import CarrinhoDrawer from "../../components/remedios/CarrinhoDrawer";
import { useCarrinho } from "../../context/CarrinhoContext";

export default function RemediosShopPage() {
  const [categorias, setCategorias] = useState<CategoriaRemedio[]>([]);
  const { adicionar } = useCarrinho();
  const produtosFiltrados = useMemo(() => {
    if (categorias.length === 0) return remedios;
    return remedios.filter((p) => categorias.includes(p.categoria));
  }, [categorias]);

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <header className="w-full p-4 bg-green-600 text-white text-2xl font-bold flex items-center justify-between">
        <span>Pet Farma - Remédios</span>
        <CarrinhoDrawer />
      </header>
      <section className="flex flex-1">
        <div className="w-1/4 p-4 border-r hidden md:block">
          <FiltroCategorias
            categorias={[]}
            selecionadas={categorias}
            onChange={setCategorias}
          />
        </div>
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {produtosFiltrados.map((produto) => (
              <ProdutoCard
                key={produto.id}
                produto={produto}
                onAdd={() => adicionar(produto)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
