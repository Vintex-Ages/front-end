---
sidebar_position: 2
---

# Autenticação

`AuthProvider` mantém usuário e token em memória e em `sessionStorage`. Ao
montar, ele restaura uma sessão válida; no login, persiste os dados e retorna o
usuário para a rota que originou o fluxo; no logout, remove a sessão.

## Cliente HTTP

`httpClient` é o único cliente Axios compartilhado. Antes de cada chamada ele
inclui o token Bearer e `X-Return-To`. Quando o back-end retorna `401` com o
código `AUTH_REQUIRED`, o cliente guarda a origem e delega a navegação ao
handler registrado pelo `AuthProvider`.

## Ações protegidas

`useProtectedAction` separa regra de sessão da apresentação. Sem sessão, salva
a intenção, abre `LoginInterceptor` e permite seguir para login ou cadastro.
Depois do login, ao voltar para a mesma rota, a intenção é retomada uma vez.

O hook reconhece apenas o contrato mínimo `401 AUTH_REQUIRED`; outros erros
limpam a intenção pendente e continuam sendo responsabilidade de quem executa
a ação.
