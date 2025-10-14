import React from "react";

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Cabeçalho principal */}
      <header>
        <label htmlFor="search">
          <div className="search-wrapper">
            <input type="text" id="search" name="search" className="search-input" placeholder="Pesquisar" />
            <button type="button" className="search-btn"><i className='bx bx-search'></i></button>
          </div>
        </label>
        <div className="logo-container">
          <img src="/imagens/logo petfarma.png" alt="logo petfarma" className="logo" />
        </div>
        <div id="cart-icon">
          <i className='bx bx-shopping-bag'></i>
        </div>
        <div id="user">
          <i className='bx bxs-user'></i>
          <a href="#" className="login-link">Entrar </a>
          <a href="#" className="cadastro-link">Cadastre-se</a>
        </div>
      </header>
      <br /><br /><br /><br /><br /><br /><br />
      {/* Terceira seção de produtos */}
      <section className="tertiary-header">
        <div className="container-imagens">
          <img src="/imagens/4.png" alt="pet" />
          <img src="/imagens/1.png" alt="pet" />
          <img src="/imagens/3.png" alt="pet" />
          <img src="/imagens/2.png" alt="pet" />
        </div>
      </section>
      <br /><br /><br /><br />
      <section className="quaternary-header">
        <p>Cuidados essenciais</p>
        <div className="container-2imagens">
          <img src="/imagens/cuidados.png" alt="pet" />
        </div>
      </section>
      {/* Divisória e carrossel de categorias */}
      <div className="categoria-divisoria">
        <div className="categoria-divisoria-bar"></div>
        <div className="categoria-divisoria-icone"><i className='bx bx-chevron-down'></i></div>
        <div className="categoria-divisoria-bar"></div>
      </div>
      <section className="compre-categoria">
        <h2>Compre por categoria</h2>
        <div className="categoria-carousel">
          <button className="carousel-btn prev" aria-label="Anterior">&#8592;</button>
          <div className="categoria-cards">
            <div className="categoria-card">
              <img src="/imagens/cuidados-filhote-de-cachorro.jpg" alt="Cachorro" />
              <span>Cachorro</span>
            </div>
            <div className="categoria-card">
              <img src="/imagens/cuidados-filhote-de-gato.jpg" alt="Gato" />
              <span>Gato</span>
            </div>
            <div className="categoria-card">
              <img src="/imagens/cuidados-outros-pets.jpg" alt="Outros pets" />
              <span>Outros pets</span>
            </div>
            <div className="categoria-card">
              <img src="/imagens/ícone de medicamento.png" alt="Remédios" />
              <span>Remédios</span>
            </div>
          </div>
          <button className="carousel-btn next" aria-label="Próximo">&#8594;</button>
        </div>
        <div className="carousel-indicators">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </section>
      <br /><br /><br /><br />
      {/* Destaque Médico-Veterinário */}
      <section className="destaque-vet">
        <img src="/imagens/veterinaria-destaque.png" alt="Veterinária" className="destaque-vet-img" />
        <div className="destaque-vet-texto">
          <h3>Produtos testados e aprovados por especialistas</h3>
          <p>Produtos com selo de verificação do Serviço de Inspeção Federal (SIF) do Ministério da Agricultura, Pecuária e Abastecimento (Mapa), visando garantir qualidade e segurança alimentar. Já para testar a ausência de crueldade contra animais em produtos (cosméticos, etc.), o foco é na proibição de testes em animais</p>
        </div>
        <button className="destaque-vet-btn" aria-label="Anterior">&#60;</button>
      </section>
      {/* Outras Categorias */}
      <section className="outras-categorias">
        <h2>Outras categorias</h2>
        <div className="outras-categorias-carousel">
          <button className="outras-carousel-btn prev" aria-label="Anterior">&#8592;</button>
          <div className="outras-categorias-cards">
            <div className="outra-categoria-card">
              <img src="/imagens/servicos.png" alt="Serviços" />
              <span className="outra-categoria-nome">Serviços</span>
            </div>
            <div className="outra-categoria-card">
              <img src="/imagens/promocao.png" alt="Promoção" />
              <span className="outra-categoria-nome">Promoção</span>
            </div>
            <div className="outra-categoria-card">
              <img src="/imagens/brinquedos.png" alt="Brinquedos" />
              <span className="outra-categoria-nome">Brinquedos</span>
            </div>
          </div>
          <button className="outras-carousel-btn next" aria-label="Próximo">&#8594;</button>
        </div>
        <div className="outras-carousel-indicators">
          <span className="outras-dot active"></span>
          <span className="outras-dot"></span>
          <span className="outras-dot"></span>
          <span className="outras-dot"></span>
        </div>
      </section>
      {/* Benefícios */}
      <section className="info-beneficios">
        <div className="beneficio">
          <i className='bx bx-clock-3'></i>
          <span className="text">Receba em horas</span>
        </div>
        <div className="beneficio">
          <i className='bx bx-credit-card-alt'></i>
          <span className="text">Até 3x sem juros</span>
        </div>
        <div className="beneficio">
          <i className='bx bx-store'></i>
          <span className="text">Retire e troque na loja</span>
        </div>
      </section>
      {/* Institucional / Sobre */}
      <div className="institucional-divisoria">
        <div className="institucional-divisoria-bar"></div>
        <div className="institucional-divisoria-icone"><i className='bx bx-chevron-down'></i></div>
        <div className="institucional-divisoria-bar"></div>
      </div> <br />
      <section className="institucional"> 
        <img src="/imagens/logo petfarma.png" alt="Logo Petfarma" className="institucional-logo" />
        <p className="institucional-texto">
          Só quem é apaixonado por animais sabe: a relação de amor e cumplicidade que temos com nossos bichinhos de estimação é um vínculo único! Por essa razão, não medimos esforços para oferecer o que há de melhor para trazer ainda mais alegria e qualidade de vida. Rações, acessórios, medicamentos e brinquedos estão na nossa listinha de prioridades; e tudo isso você encontra em nosso Petfarma online.
        </p>
      </section>
      {/* Aqui pode ser inserido o children se necessário */}
      {children}
    </>
  );
}
