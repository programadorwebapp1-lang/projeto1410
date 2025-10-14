import React from "react";
import { CategoriaRemedio } from "../../mockRemedios";

interface Props {
  categorias: CategoriaRemedio[];
  selecionadas: CategoriaRemedio[];
  onChange: (cats: CategoriaRemedio[]) => void;
}

const todasCategorias: CategoriaRemedio[] = [
  "Antipulgas e Carrapatos",
  "Vermífugos",
  "Antibióticos",
  "Suplementos e Vitaminas",
  "Antiinflamatórios",
  "Ansiedade e Estresse",
  "Outros",
];

export default function FiltroCategorias({ selecionadas, onChange }: Props) {
  function toggle(cat: CategoriaRemedio) {
    if (selecionadas.includes(cat)) {
      onChange(selecionadas.filter((c) => c !== cat));
    } else {
      onChange([...selecionadas, cat]);
    }
  }
  return (
    <div>
      <h2 className="font-semibold mb-2">Categorias</h2>
      <ul className="space-y-2">
        {todasCategorias.map((cat) => (
          <li key={cat}>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selecionadas.includes(cat)}
                onChange={() => toggle(cat)}
              />
              {cat}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
