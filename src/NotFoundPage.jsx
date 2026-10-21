import React from 'react';

export default function NotFoundPage() {
  return (
    <main className={"not-found-page"}>
      <section className={"not-found-content"} aria-labelledby={"not-found-title"}>
        <p className={"not-found-code"} aria-hidden={"true"}>404</p>
        <p className={"not-found-eyebrow"}>Erro 404</p>
        <h1 id={"not-found-title"}>Página não encontrada</h1>
        <p className={"not-found-description"}>Este endereço não existe ou foi alterado.</p>
        <a className={"not-found-home-link"} href={"/"}>
          Voltar ao início
          <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
            <path d={"M5 12h14"} />
            <path d={"m12 5 7 7-7 7"} />
          </svg>
        </a>
      </section>
    </main>
  );
}
