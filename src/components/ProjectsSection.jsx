import React from 'react';

export default function ProjectsSection() {
  return (
    <section id="projetos" className="projects-section" aria-labelledby="projects-title">
      <div className="projects-section-inner">
        <p className="projects-eyebrow">Portfólio</p>
        <h2 id="projects-title">Projetos</h2>
        <div className="projects-grid">
          <article className="project-card">
            <div className="project-card-content">
              <p className="project-card-type">Dashboard · Web</p>
              <h3>Dashboard Demo</h3>
              <p className="project-card-description">
                Painel de BI para acompanhar a ocupação de armazéns.
              </p>
              <p className="project-card-summary">
                Reúne indicadores de ocupação, gráficos por depósito, consulta detalhada de endereços e filtros para explorar os dados. A demonstração usa dados fictícios.
              </p>
              <ul className="project-tech-list" aria-label="Tecnologias">
                <li>React</li>
                <li>.NET 8</li>
                <li>Firebird</li>
              </ul>
              <div className="project-card-actions">
                <a href="https://projectdemo-dashboard.netlify.app" target="_blank" rel="noopener noreferrer">
                  Ver demonstração <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
