---
sidebar_position: 2
---

# Assistente Vintex

A Vintex AI é a interface de curadoria de looks. A página e seus componentes
consomem tipos de `src/types/vintex-ai.ts` e o serviço `vintexAiService`, que
mantém a fronteira entre UI e provedor.

## Conversa e sugestões

`chat()` expõe uma sequência assíncrona de chunks para atualizar a resposta
gradualmente. `getOutfitSuggestion()` produz a sugestão estruturada mostrada
nos cards. O serviço oferece respostas mockadas enquanto `VITE_USE_MOCKS` não
for `false`, permitindo demonstrar a experiência sem provedor externo.

## Degradação

Falhas de comunicação não devem impedir navegação ou catálogo. A tela mostra o
estado de erro da conversa e preserva o restante da experiência. A escolha ou
troca de provedor de IA continua sendo uma decisão da camada de serviço.
