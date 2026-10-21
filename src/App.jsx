import React, { Suspense, lazy, useEffect, useState } from 'react';
import { setupExportMotion } from './motion.js';
import NotFoundPage from './NotFoundPage.jsx';
import PortfolioNav from './components/PortfolioNav.jsx';

const pagesBySize = {
  desktop: lazy(() => import('./HomeDesktopPage.jsx')),
  tabletWide: lazy(() => import('./HomeTabletWidePage.jsx')),
  tablet: lazy(() => import('./HomeTabletPage.jsx')),
  mobileWide: lazy(() => import('./HomeMobileWidePage.jsx')),
  mobile: lazy(() => import('./HomeMobilePage.jsx')),
};

const pageTitles = {
  '/': 'Pedro Lucas — Programador',
  '/servicos': 'Serviços — Pedro Lucas',
  '/skills': 'Skills — Pedro Lucas',
  '/formacao': 'Formação — Pedro Lucas',
  '/projetos': 'Projetos — Pedro Lucas',
  '/contato': 'Contato — Pedro Lucas',
};

const knownRoutes = new Set(Object.keys(pageTitles));

function variant() {
  const width = window.innerWidth;
  return width < 600 ? 'mobile' : width < 810 ? 'mobileWide' : width < 1000 ? 'tablet' : width < 1200 ? 'tabletWide' : 'desktop';
}

function routeClass(route) {
  return route === '/' ? 'inicio' : route.slice(1);
}

function ExportMotion() {
  useEffect(() => setupExportMotion(), []);
  return null;
}

export default function App() {
  const [size, setSize] = useState(variant);
  const route = window.location.pathname.replace(/\/+$/, '') || '/';
  const Page = knownRoutes.has(route) ? pagesBySize[size] : null;

  useEffect(() => {
    const onResize = () => setSize(variant());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const element = entry.target;
          element.style.transition = 'opacity .55s ease, transform .55s ease';
          element.style.opacity = '1';
          element.style.transform = 'none';
          observer.unobserve(element);
        }
      }
    }, { threshold: 0.05 });
    document.querySelectorAll('[data-export-reveal]').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [size, route]);

  useEffect(() => {
    document.title = pageTitles[route] || 'Página não encontrada — Pedro Lucas';
  }, [route]);

  return (
    <div className={`portfolio-page portfolio-page-${routeClass(route)}`}>
      <PortfolioNav currentRoute={route} />
      {Page ? (
        <Suspense fallback={<main className="portfolio-loading" aria-label="Carregando página" />}>
          <Page />
          <ExportMotion />
        </Suspense>
      ) : <NotFoundPage />}
    </div>
  );
}
