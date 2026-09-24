---
sidebar_position: 1
---

# Catálogo

`catalogService` é a fronteira de dados do catálogo: feed, detalhe, filtros e
busca. Páginas e componentes consomem suas funções tipadas, sem conhecer Axios
nem o formato do back-end.

## Mock e API

`VITE_USE_MOCKS` controla a origem. Mocks ficam ativos por padrão; somente o
valor literal `false` seleciona a API. Isso mantém catálogo e detalhe
utilizáveis em desenvolvimento sem depender do servidor.

## Comportamentos

- O feed retorna apenas peças ativas, com paginação e ordenação por novidade.
- Filtros combinam categoria, marca e faixa de preço.
- A busca pode devolver resultado exato ou sugestões quando não há resultado.
- O detalhe adapta produto, mídias e loja para os tipos usados na interface.

`components/catalog/` reúne controles de busca e filtros; `components/product/`
exibe cards, grade, galeria e estados visuais do produto.
