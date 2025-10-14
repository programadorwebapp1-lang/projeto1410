import React from "react";

export default function HeaderDefault() {
  return (
    <header className="top-header">
      <div className="logo"> #00293b;
        <img src="/imagens/logo.png" alt="PetFarma" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Pesquisar..." />
        <i className="bx bx-search"></i>
      </div>
      <div className="user-cart">
        <div className="cart">
          <i className="bx bx-cart"></i>
          <span>Carrinho</span>
        </div>
        <div className="user">
          <i className="bx bxs-user"></i>
          <a href="/login">Entrar</a> / <a href="/cadastro">Cadastre-se</a>
        </div>
      </div>
    </header>
  );
}
