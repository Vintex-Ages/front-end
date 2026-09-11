import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { REDIRECT_STORAGE_KEY } from '@/services/httpClient';
import Register from './Register';

/**
 * Componente auxiliar que expõe a rota atual para validar
 * o destino após a conclusão do cadastro.
 */
function PathProbe() {
  const location = useLocation();

  return <span data-testid="path">{location.pathname + location.search}</span>;
}

/**
 * Renderiza a página de cadastro dentro de um Router controlado.
 *
 * Permite iniciar o teste tanto com uma rota simples quanto com um
 * estado de navegação contendo a origem do fluxo interrompido.
 */
function renderRegister(initialEntry: string | { pathname: string; state?: unknown }) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Register />
      <PathProbe />
    </MemoryRouter>,
  );
}

describe('Register', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  /**
   * Critério de aceite da FE-US002-3:
   *
   * Quando o cadastro foi iniciado a partir de uma ação protegida,
   * a origem recebida pelo fluxo de autenticação deve ser utilizada
   * como destino após a conclusão do cadastro.
   */
  it('retorna para a origem informada pelo fluxo de autenticação', () => {
    renderRegister({
      pathname: '/register',
      state: {
        from: '/catalog?category=roupas',
      },
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Criar conta',
      }),
    );

    expect(screen.getByTestId('path')).toHaveTextContent('/catalog?category=roupas');
  });

  /**
   * Quando a origem não está no state da navegação, o cadastro utiliza
   * a origem persistida pelo fluxo de autenticação no sessionStorage.
   *
   * Depois do retorno, a chave é removida para não reutilizar uma origem
   * antiga em um fluxo de autenticação posterior.
   */
  it('usa a origem salva no sessionStorage quando não existe state de navegação', () => {
    window.sessionStorage.setItem(REDIRECT_STORAGE_KEY, '/product?id=123');

    renderRegister('/register');

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Criar conta',
      }),
    );

    expect(screen.getByTestId('path')).toHaveTextContent('/product?id=123');

    expect(window.sessionStorage.getItem(REDIRECT_STORAGE_KEY)).toBeNull();
  });

  /**
   * Sem uma origem pendente, o fluxo de cadastro deve utilizar
   * o destino padrão definido pela aplicação: a Home.
   */
  it('vai para a home quando não existe return_to', () => {
    renderRegister('/register');

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Criar conta',
      }),
    );

    expect(screen.getByTestId('path')).toHaveTextContent('/');
  });
});
