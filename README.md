# thiago662.github.io

Portfólio pessoal de **Thiago Gonçalves Santos**, construído em [Astro](https://astro.build).

🌐 **Site:** [thiago662.github.io](https://thiago662.github.io)
📄 **Currículo:** [PDF](./public/curriculo.pdf) · [texto corrido](./curriculo.md)

## Stack

Astro · TypeScript

## Rodando localmente

```bash
npm install
npm run dev
```

## Scripts

| Comando               | O que faz                                          |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento                          |
| `npm run build`        | Build estático em `docs/` (servido pelo GitHub Pages) |
| `npm run preview`      | Serve o build de `docs/` localmente                  |
| `npm run resume:pdf`   | Regenera `public/curriculo.pdf` a partir de `src/data/resume.ts` |
| `npm run resume:docx`  | Regenera `public/curriculo.docx`                     |

## Estrutura

- `src/data/resume.ts` — fonte única de verdade do conteúdo do currículo (usada pela página e pelos geradores de PDF/DOCX).
- `src/pages/index.astro` — página principal.
- `src/lib/github.ts` — busca projetos em destaque via API pública do GitHub (repositórios com a topic `portfolio`).
- `docs/` — build estático, gerado automaticamente. Não editar na mão.

## Contato

[LinkedIn](https://www.linkedin.com/in/thiago-gon%C3%A7alves-santos-730a74199/) · [GitHub](https://github.com/thiago662) · thiago1santos12@gmail.com
