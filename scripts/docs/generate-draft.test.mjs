import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { groupByPage, loadPathMap, matchPage, renderDraft } from './generate-draft.mjs';

const entries = [
  { pattern: 'src/context/**', page: 'arquitetura/autenticacao' },
  { pattern: 'src/services/catalogService.ts', page: 'funcionalidades/catalogo' },
];

test('encontra o primeiro padrão correspondente', () => {
  assert.equal(matchPage('src/context/AuthContext.tsx', entries), 'arquitetura/autenticacao');
  assert.equal(matchPage('src/services/catalogService.ts', entries), 'funcionalidades/catalogo');
});

test('normaliza barras invertidas antes de comparar', () => {
  assert.equal(matchPage('src\\context\\useAuth.ts', entries), 'arquitetura/autenticacao');
});

test('retorna null para caminho sem mapa', () => {
  assert.equal(matchPage('src/pages/Landing/Landing.tsx', entries), null);
});

test('agrupa páginas e separa caminhos sem mapa', () => {
  const result = groupByPage(
    ['src/context/AuthContext.tsx', 'src/services/catalogService.ts', 'src/pages/Landing/Landing.tsx'],
    entries,
  );

  assert.deepEqual([...result.mapped.entries()], [
    ['arquitetura/autenticacao', ['src/context/AuthContext.tsx']],
    ['funcionalidades/catalogo', ['src/services/catalogService.ts']],
  ]);
  assert.deepEqual(result.unmapped, ['src/pages/Landing/Landing.tsx']);
});

test('renderiza rascunho vazio', () => {
  assert.match(renderDraft({ mapped: new Map(), unmapped: [] }), /Nenhum arquivo alterado/);
});

test('renderiza páginas e caminhos sem mapa sem transformar isso em falha', () => {
  const draft = renderDraft({
    mapped: new Map([['funcionalidades/catalogo', ['src/services/catalogService.ts']]]),
    unmapped: ['src/pages/Landing/Landing.tsx'],
  });

  assert.match(draft, /`funcionalidades\/catalogo`/);
  assert.match(draft, /`src\/services\/catalogService\.ts`/);
  assert.match(draft, /Sem mapeamento em path-map\.json/);
  assert.match(draft, /não bloqueia o merge/);
});

test('lê o mapa versionado do projeto', () => {
  const currentDirectory = dirname(fileURLToPath(import.meta.url));
  const pathMap = resolve(currentDirectory, '../../documentation/path-map.json');
  const loaded = loadPathMap(pathMap);

  assert.ok(loaded.length > 0);
  assert.ok(loaded.every((entry) => typeof entry.pattern === 'string' && typeof entry.page === 'string'));
});
