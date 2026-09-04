import { useState, type FormEvent, type SVGProps } from 'react';
 
/**
 * Painel de busca da assistente Vintex para a versão web — bloco de
 * destaque com status "online", pergunta editorial e campo de busca com
 * sugestões rápidas. Baseado no Figma da versão desktop (frame do hero
 * de busca).
 *
 * Uso:
 *   import { VintexAIHeroPanel } from '@/components/layout/web/VintexAIHeroPanel';
 *   <VintexAIHeroPanel onSubmit={(query) => ...} />
 */
 
interface VintexAIHeroPanelProps {
  /** Texto pequeno acima do título (ex: "IA calibrada • Vintage 90s + Alfaiataria"). */
  eyebrow?: string;
  /** Pergunta principal, em destaque. */
  heading?: string;
  placeholder?: string;
  /** Chips de sugestão clicáveis, preenchem o campo de busca. */
  suggestions?: string[];
  onlineLabel?: string;
  isOnline?: boolean;
  /** Chamado ao enviar o formulário com o texto digitado. */
  onSubmit?: (query: string) => void;
}
 
function SendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#hero-send-icon-clip)">
        <path d="M17.4166 1.58337L8.70825 10.2917" stroke="#FFFAF2" strokeWidth={1.425} />
        <path
          d="M17.4166 1.58337L11.8749 17.4167L8.70825 10.2917L1.58325 7.12504L17.4166 1.58337Z"
          stroke="#FFFAF2"
          strokeWidth={1.425}
        />
      </g>
      <defs>
        <clipPath id="hero-send-icon-clip">
          <rect width="19" height="19" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
 
export function VintexAIHeroPanel({
  eyebrow = 'IA calibrada • Vintage 90s + Alfaiataria',
  heading = 'O que você procura hoje no RS?',
  placeholder = 'Descreva a peça ou estilo...',
  suggestions = ['Blazer de lã', 'Jeans anos 90', 'Camisa de seda'],
  onlineLabel = 'Online',
  isOnline = true,
  onSubmit,
}: VintexAIHeroPanelProps) {
  const [query, setQuery] = useState('');
 
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSubmit?.(trimmed);
    setQuery('');
  }
 
  function handleSuggestionClick(suggestion: string) {
    setQuery(suggestion);
  }
 
  return (
    <div className="w-full max-w-[460px] rounded-none border border-branco-quente/30 bg-vermelho-escuro p-10 min-h-[280px]">
      <div className="flex items-center justify-between gap-4">
        <p className="text-label font-semibold uppercase tracking-wide text-branco-quente/80">
          {eyebrow}
        </p>
        {isOnline ? (
          <p className="flex flex-shrink-0 items-center gap-2 text-label font-semibold uppercase tracking-wide text-branco-quente/80">
            <span className="h-2 w-2 rounded-full bg-dourado" aria-hidden="true" />
            {onlineLabel}
          </p>
        ) : null}
      </div>
 
      <h2 className="mt-6 font-display text-h2 font-semibold leading-tight text-branco-quente">
        {heading}
      </h2>
 
      <form onSubmit={handleSubmit} className="mt-8 flex items-center gap-3">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="flex-1 rounded-none border border-linha bg-branco-quente px-5 py-4 text-body text-tinta placeholder:text-texto-auxiliar focus:outline-none focus-visible:ring-2 focus-visible:ring-branco-quente"
        />
        <button
          type="submit"
          aria-label="Enviar"
          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-none bg-verde-rs"
        >
          <SendIcon className="h-5 w-5" />
        </button>
      </form>
 
      {suggestions.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-3">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="rounded-full border border-branco-quente/40 px-5 py-2 text-body text-branco-quente"
            >
              {suggestion}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
 
export default VintexAIHeroPanel;