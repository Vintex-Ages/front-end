import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { paths } from '@/routes/paths';
import { REDIRECT_STORAGE_KEY } from '@/services/httpClient';

/**
 * Página de cadastro.
 *
 * Quando o cadastro é iniciado a partir de uma ação protegida, a origem
 * pode ser recebida pelo estado de navegação (`location.state.from`).
 *
 * Após a conclusão do cadastro, essa origem é usada para retornar o usuário
 * ao ponto em que o fluxo foi interrompido.
 *
 * Quando não existe uma origem pendente, o fluxo segue para a Home.
 *
 * A retomada da ação protegida acontece na página de origem por meio do
 * `useProtectedAction`, que identifica a intenção persistida em
 * `sessionStorage`.
 */
function Register() {
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Recupera a origem enviada pela barreira de autenticação.
   *
   * O estado de navegação é usado como fallback para o caso em que a
   * origem ainda não esteja disponível no `sessionStorage`.
   */
  const getReturnTo = useCallback(() => {
    const state = location.state as { from?: string } | null;

    if (state?.from) {
      return state.from;
    }

    try {
      return window.sessionStorage.getItem(REDIRECT_STORAGE_KEY) ?? paths.home;
    } catch {
      return paths.home;
    }
  }, [location.state]);

  /**
   * Conclui o cadastro e retorna ao fluxo interrompido.
   *
   * A implementação real da criação da conta será conectada à API na
   * task correspondente ao formulário de cadastro.
   *
   * Neste ponto, a regra da FE-US002-3 é:
   * - com `return_to`, voltar para a origem;
   * - sem `return_to`, voltar para a Home.
   *
   * Ao voltar para a origem, o `useProtectedAction` poderá reconhecer
   * a intenção pendente e tentar retomá-la.
   */
  const handleRegister = useCallback(() => {
    const returnTo = getReturnTo();

    try {
      window.sessionStorage.removeItem(REDIRECT_STORAGE_KEY);
    } catch {
      // Storage indisponível: a navegação ainda pode continuar normalmente.
    }

    navigate(returnTo, {
      replace: true,
    });
  }, [getReturnTo, navigate]);

  return (
    <main>
      <h1>Criar conta</h1>

      <button type="button" onClick={handleRegister}>
        Criar conta
      </button>
    </main>
  );
}

export default Register;
