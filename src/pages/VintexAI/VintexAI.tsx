import { useEffect, useRef, useState, type FormEvent, type SVGProps } from 'react';
import {
  OutfitSuggestionCard,
  type OutfitSuggestion,
} from '@/components/layout/VintexAITool/OutfitSuggestionCard';

/**
 * Tela de conversa com a assistente Vintex (mock visual, Figma frame do chat).
 *
 * Responsiva: usa os breakpoints do projeto (`tablet:` 720px, `web:` 1050px).
 * Mobile e tablet herdam exatamente o layout original (coluna estreita
 * centralizada). A partir de `web:`, o cabeçalho e a linha divisória acima
 * das mensagens passam a ocupar a largura inteira da tela — como uma barra
 * de topo de verdade — enquanto as mensagens e o input continuam num bloco
 * central mais estreito (`max-w-4xl`).
 *
 * Estático por enquanto: as mensagens em `INITIAL_MESSAGES` simulam uma troca
 * já em andamento, e as imagens das peças são placeholders (ícones de
 * categoria) até existir um serviço/CDN real para o catálogo. Usa só os
 * tokens de `src/styles/tokens.ts` via classes Tailwind (`bg-papel`,
 * `text-h2`, …) — nenhuma cor ou tamanho de fonte é escrito à mão aqui.
 *
 * Uso: ainda sem rota própria (FE-FND-1c, #106); renderizar direto onde
 * fizer sentido para teste, ex.:
 *   import VintexAI from '@/pages/VintexAI/VintexAI';
 *   <VintexAI />
 */

type ChatRole = 'user' | 'vintex';

interface ChatMessage {
  id: string;
  role: ChatRole;
  timestamp: string;
  text: string;
  outfit?: OutfitSuggestion;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    role: 'user',
    timestamp: 'agora',
    text: 'Quero um look para um café no domingo, com cara vintage mas sem parecer fantasia.',
  },
  {
    id: 'm2',
    role: 'vintex',
    timestamp: 'agora',
    text: 'Entendi: confortável, com memória de brechó e uma base fácil de usar. Montei uma primeira combinação com contraste baixo e uma textura para dar personalidade.',
    outfit: {
      title: 'Domingo de garimpo',
      description: 'Uma composição leve para circular pela cidade e ainda render um achado.',
      items: [
        { id: 'i1', label: 'Camisa leve', icon: 'shirt' },
        { id: 'i2', label: 'Jeans reto', icon: 'pants' },
        { id: 'i3', label: 'Bolsa de couro', icon: 'bag' },
      ],
      note: 'Conteúdo sintético para visualizar a ideia. A curadoria real poderá cruzar suas preferências com peças disponíveis.',
    },
  },
];

const SUGGESTION_CHIPS = ['Look para um jantar', 'Cores mais neutras', 'Até R$ 250'];

/**
 * Estilo de scrollbar fino/discreto para a lista de mensagens. Fica sem
 * efeito em touch (celular já usa overlay scrollbar do sistema), então é
 * seguro deixar sempre ativo em vez de restringir a um breakpoint.
 * O hex usado é o mesmo do token `linha` (`#CFC3B3`) — pseudo-elementos de
 * scrollbar não são alcançáveis por classes utilitárias do Tailwind.
 */
function ChatScrollStyle() {
  return (
    <style>{`
      .vintex-chat-scroll {
        scrollbar-width: thin;
        scrollbar-color: #CFC3B3 transparent;
      }
      .vintex-chat-scroll::-webkit-scrollbar {
        width: 6px;
      }
      .vintex-chat-scroll::-webkit-scrollbar-thumb {
        background-color: #CFC3B3;
        border-radius: 9999px;
      }
      .vintex-chat-scroll::-webkit-scrollbar-track {
        background: transparent;
      }
    `}</style>
  );
}

function BackIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} {...props}>
      <path d="M15 5 8 12l7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} {...props}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#send-icon-clip)">
        <path d="M17.4166 1.58337L8.70825 10.2917" stroke="#FFFAF2" strokeWidth={1.425} />
        <path
          d="M17.4166 1.58337L11.8749 17.4167L8.70825 10.2917L1.58325 7.12504L17.4166 1.58337Z"
          stroke="#FFFAF2"
          strokeWidth={1.425}
        />
      </g>
      <defs>
        <clipPath id="send-icon-clip">
          <rect width="19" height="19" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function IntroPrompt() {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 pb-6">
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-vermelho-escuro text-vermelho-escuro web:translate-y-1">
        <PlusIcon className="h-4 w-4" />
      </span>
      <p className="font-display text-body font-semibold text-tinta web:whitespace-nowrap web:text-h2">
        Vamos garimpar com intenção?
      </p>
      <p className="col-start-2 mt-1 text-body text-texto-auxiliar">
        Me conte a ocasião, as cores que você gosta ou uma peça que já mora no seu armário.
      </p>
    </div>
  );
}

function UserBubble({ message }: { message: ChatMessage }) {
  return (
    <div className="rounded-none bg-vermelho-escuro p-4 shadow-[6px_6px_0_0_theme(colors.vermelho-contorno)]">
      <p className="text-label font-semibold uppercase text-branco-quente">Você</p>
      <p className="mt-2 text-body text-branco-quente">{message.text}</p>
      <p className="mt-2 text-label text-branco-quente/70">{message.timestamp}</p>
    </div>
  );
}

function VintexBubble({ message }: { message: ChatMessage }) {
  return (
    <div className="rounded-none border border-linha bg-branco-quente p-4">
      <p className="text-label font-semibold uppercase text-vermelho-escuro">Vintex</p>
      <p className="mt-2 text-body text-tinta">{message.text}</p>
      {message.outfit ? <OutfitSuggestionCard suggestion={message.outfit} /> : null}
    </div>
  );
}

export default function VintexAI() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: 'user', timestamp: 'agora', text },
    ]);
    setDraft('');
  }

  function handleChipClick(chip: string) {
    setDraft(chip);
  }

  return (
    <div className="mx-auto flex h-screen w-full max-w-md flex-col overflow-hidden bg-papel font-ui text-tinta tablet:max-w-2xl web:max-w-none">
      <ChatScrollStyle />

      <header className="flex items-center gap-4 border-b border-linha px-4 py-4 tablet:px-8 web:px-10">
        <button
          type="button"
          aria-label="Voltar"
          className="flex h-10 w-10 items-center justify-center rounded-none border border-linha bg-branco-quente text-tinta"
        >
          <BackIcon className="h-5 w-5" />
        </button>
        <h1 className="font-display text-body font-semibold text-tinta">Conversa com a Vintex</h1>
      </header>

      <div className="vintex-chat-scroll flex-1 overflow-y-auto px-4 pb-6 pt-6 tablet:px-8 web:px-10">
        <div className="mx-auto w-full max-w-md tablet:max-w-2xl web:max-w-6xl">
          <div className="mx-auto w-full web:max-w-4xl">
            <IntroPrompt />
          </div>
        </div>

        <hr className="border-linha" />

        <div className="mx-auto w-full max-w-md space-y-4 pt-6 tablet:max-w-2xl web:max-w-6xl">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="w-full max-w-[85%] tablet:max-w-[70%] web:max-w-[65%]">
                {message.role === 'user' ? (
                  <UserBubble message={message} />
                ) : (
                  <VintexBubble message={message} />
                )}
              </div>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>
      </div>

      <div className="border-t border-linha bg-papel px-4 pb-4 pt-3 tablet:px-8 web:px-10">
        <div className="mx-auto w-full max-w-md tablet:max-w-2xl web:max-w-6xl">
          <div className="mb-3 flex gap-2 overflow-x-auto">
            {SUGGESTION_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleChipClick(chip)}
                className="flex-shrink-0 rounded-full border border-linha bg-papel px-4 py-2 text-body text-tinta"
              >
                {chip}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Conte o que você quer vestir..."
              className="flex-1 rounded-none border border-linha bg-branco-quente px-4 py-3 text-body text-tinta placeholder:text-texto-auxiliar focus:outline-none focus-visible:ring-2 focus-visible:ring-vermelho-escuro"
            />
            <button
              type="submit"
              aria-label="Enviar mensagem"
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-none bg-vermelho-escuro text-branco-quente"
            >
              <SendIcon className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
