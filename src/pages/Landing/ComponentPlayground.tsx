import { VintexAIButton } from '@/components/layout/VintexAIButton';

/**
 * Página em branco, sem rota fixa no projeto, criada apenas para
 * visualizar componentes isoladamente durante o desenvolvimento.
 * Pode ser apagada quando não for mais necessária.
 */
export default function ComponentPlayground() {
  return (
    <div className="min-h-screen bg-white">
      <VintexAIButton onClick={() => alert('Botão clicado!')} />
    </div>
  );
}
