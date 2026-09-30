# Documentação viva (VE-25)

Portal Docusaurus do front-end Vintex.

```bash
cd documentation
npm ci
npm start    # servidor local em http://localhost:3000
npm run build
```

## Estrutura

```text
documentation/
├── docs/                    # conteúdo Markdown
├── path-map.json            # caminho de código → página
├── docusaurus.config.js
├── sidebars.js
└── src/css/custom.css
```

`scripts/docs/generate-draft.mjs` compara arquivos alterados em um PR com
`path-map.json`. O workflow
[`documentation-draft.yml`](../.github/workflows/documentation-draft.yml)
publica o rascunho no PR e um preview como artifact, sem bloquear merge.

## Escopo

- Portal Docusaurus em `documentation/`.
- Mapa versionado de caminhos para páginas.
- Rascunho e preview informativos por PR.
- Conteúdo Markdown compatível com futuras páginas geradas pelo Cognitrace.
