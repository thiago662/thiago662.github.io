# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## O que é

Site de portfólio pessoal (Thiago Gonçalves Santos), em Astro. Repositório também é o repo especial de perfil do GitHub (nome bate com o usuário, `thiago662/thiago662.github.io`), mas o `README.md` na raiz documenta o projeto normalmente — não é mais usado como bio de perfil.

## Comandos

- `npm run dev` — servidor de dev (`astro dev`).
- `npm run build` — builda o site estático direto em `docs/` (não `dist/` — ver abaixo). Roda `prebuild` automaticamente antes, que regenera `public/curriculo.pdf`.
- `npm run preview` — serve o build de `docs/` localmente.
- `npm run resume:pdf` — regenera só o PDF do currículo a partir de `src/data/resume.ts`.
- `npm run resume:docx` — regenera o `.docx` do currículo (não roda automaticamente no build — mantido manual de propósito, editado/exportado à parte quando necessário).

## Arquitetura

- **`docs/` é o diretório de build, não código-fonte.** GitHub Pages deste repo serve a partir de `/docs` (não há GitHub Actions configurado) — por isso `astro.config.mjs` define `outDir: 'docs'` em vez do padrão `dist/`. Não editar arquivos em `docs/` na mão, eles são sobrescritos a cada build.
- **`src/data/resume.ts`** é a fonte única de verdade do conteúdo do currículo — dados tipados (experiência, formação, skills, idiomas, contato). Tanto a página (`src/pages/index.astro`) quanto os dois scripts geradores (`scripts/generate-resume-pdf.mjs`, `scripts/generate-resume-docx.mjs`) leem desse mesmo arquivo. Ao atualizar currículo, editar só esse arquivo — os PDFs/Word e o site refletem a partir dele.
- **Scripts de geração de currículo** (`scripts/*.mjs`) rodam com Node nativo importando `resume.ts` diretamente (Node 22+ faz type-stripping de TypeScript sem build step) — não precisam de `ts-node` nem de compilação prévia.
- **Projetos em destaque no site vêm da API pública de busca do GitHub** (`src/lib/github.ts`), filtrando repositórios do usuário `thiago662` pela topic `starred` (sem token/autenticação — endpoint de busca é público). Pra um projeto aparecer na seção "Projetos", adicionar a topic `starred` a ele em GitHub → repositório → engrenagem do "About" → Topics. Se o repo também tiver o campo `homepage` preenchido no GitHub, aparece um link "Ver ao vivo" além do link pro código-fonte.
- **Open Graph/meta tags** ficam centralizadas em `src/layouts/Layout.astro`, recebendo `title`/`description`/`image` por página.
- Este projeto substituiu uma versão anterior em Angular 17 (histórico preservado no git log). Não há mais SSR/Express/roteamento — é geração estática pura.

## Currículo em texto corrido

`curriculo.md`, na raiz, é a versão em prosa do currículo (pra colar direto em processo seletivo/ATS ou mandar por e-mail). É mantido manualmente em paralelo a `src/data/resume.ts` — ao mudar um, revisar se o outro precisa do mesmo ajuste.

`curriculo-atual.md` é uma variante do mesmo texto sem citar o nome do cliente atual (menciona só "cliente sob NDA"), pra uso quando o acordo de confidencialidade impede citar a empresa. Ao atualizar `curriculo.md`, replicar o mesmo ajuste aqui (exceto a parte do nome do cliente/projetos, que é deliberadamente diferente).

`carta-apresentacao.md` é uma carta de apresentação genérica (não vinculada a nenhuma vaga específica), mantida como arquivo interno do repositório. `carta-apresentacao.pdf`/`.docx`, também na raiz (não em `public/`), são cópias formatadas geradas manualmente a partir do mesmo texto — ficam fora de `public/`/`docs/` de propósito, então não são servidas pelo GitHub Pages nem aparecem pra download no site. Se o texto da carta mudar, regenerar essas cópias na mão (não há script fixo no `package.json` pra isso, é geração pontual).
