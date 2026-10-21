import React from 'react';

const links = [
  { href: '/', label: 'Início' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/skills', label: 'Skills' },
  { href: '/formacao', label: 'Formação' },
  { href: '/projetos', label: 'Projetos' },
  { href: '/contato', label: 'Contato' },
];

export default function PortfolioNav({ currentRoute }) {
  return (
    <header className="portfolio-nav">
      <div className="portfolio-nav-inner">
        <a className="portfolio-brand" href="/">Pedro Lucas</a>
        <nav className="portfolio-nav-links" aria-label="Navegação principal">
          {links.map(({ href, label }) => (
            <a key={href} href={href} aria-current={currentRoute === href ? 'page' : undefined}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
