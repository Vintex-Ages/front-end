---
slug: /
sidebar_position: 1
---

# Vintex — Front-end

Documentação viva do front-end Vintex, mantida em `documentation/` (VE-25,
[#252](https://github.com/Vintex-Ages/front-end/issues/252)).

Todo PR que altera um caminho presente em
[`path-map.json`](https://github.com/Vintex-Ages/front-end/blob/develop/documentation/path-map.json)
recebe um comentário indicando quais páginas revisar. A automação é apenas
informativa: arquivos sem mapa e falhas do preview nunca bloqueiam merge.

## Onde começar

- [Fundação do front-end](arquitetura/fundacao-front-end) — inicialização, rotas e responsabilidades.
- [Autenticação](arquitetura/autenticacao) — sessão, retorno pós-login e ações protegidas.
- [Catálogo](funcionalidades/catalogo) — dados de produtos, mocks, busca e filtros.
- [Assistente Vintex](funcionalidades/assistente-vintex) — chat e sugestões de look.
- [Tokens](design-system/tokens) — paleta, tipografia, espaçamentos e breakpoints.

## Cognitrace

A futura integração Cognitrace (VE-28, [#253](https://github.com/Vintex-Ages/front-end/issues/253))
adicionará evidências do uso de IA como páginas Markdown neste portal, sem
precisar alterar o formato da documentação.
