---
sidebar_position: 1
---

# Fundação do front-end

O front-end usa React 18, TypeScript, Vite, Tailwind CSS, React Router e Axios.
`src/main.tsx` monta a aplicação; `App.tsx` organiza `BrowserRouter`,
`AuthProvider` e `AppRoutes`.

## Rotas

`src/routes/paths.ts` é a fonte de verdade dos caminhos. `AppRoutes` associa
esses caminhos às telas e encaminha URLs desconhecidas para `NotFound`.

As páginas ficam em `src/pages/`; componentes reutilizáveis em
`src/components/`; acesso HTTP e adaptação de contratos em `src/services/`.
Componentes de interface não chamam a API diretamente.

## Dados e estado

O estado que só pertence a uma tela fica local. O `AuthContext` concentra a
sessão, pois ela é compartilhada pela aplicação. Serviços encapsulam Axios,
mocks e conversões de contratos externos antes que os dados cheguem à UI.

## Testes e qualidade

Vitest cobre serviços, hooks, componentes e rotas. O CI executa lint,
formatação, auditoria, checagem de tipos, testes e build. A documentação tem um
teste separado para o gerador de rascunhos de PR.
