import { VintexAIButton } from '@/components/layout/mobile/VintexAIButton/VintexAIButton';

export default function ComponentPlayground() {
  return (
    <div className="min-h-screen bg-white">
      <VintexAIButton onClick={() => alert('Botão clicado!')} />
    </div>
  );
}
