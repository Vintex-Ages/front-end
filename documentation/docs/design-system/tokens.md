---
sidebar_position: 1
---

# Tokens e design system

`src/styles/tokens.ts` é a fonte de verdade da Style Guide Vintex. O Tailwind
consome esses valores, e componentes devem usar utilitários derivados dos
tokens em vez de cores ou famílias tipográficas arbitrárias.

## Fundação visual

- Cores: papel, tinta, vermelho escuro, verde RS e demais cores da paleta oficial.
- Tipografia: Inter para a interface e Fraunces para conteúdo editorial.
- Espaçamento: ritmo em múltiplos de 4 px.
- Breakpoints: mobile, tablet (720 px) e web (1050 px), em abordagem mobile-first.

`StyleGuide` permite revisar os tokens na interface. Componentes comuns e de
layout preservam comportamento genérico, HTML semântico, foco visível e
contraste adequado; regras específicas pertencem à página ou ao hook que as usa.
