"use client";

import { useActionState } from "react";
import { Loader2, LogIn } from "lucide-react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginAction,
    initialState,
  );

  return (
    <form className="admin-form" action={formAction}>
      <div className="field">
        <label htmlFor="admin-password">Contraseña del panel</label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={state.error ? "true" : undefined}
          aria-describedby={state.error ? "admin-password-error" : undefined}
        />
      </div>

      {state.error ? (
        <p className="form-error" id="admin-password-error" role="alert">
          {state.error}
        </p>
      ) : null}

      <button className="button-primary" type="submit" disabled={pending}>
        {pending ? (
          <>
            <Loader2 size={17} className="spin" aria-hidden="true" />{" "}
            Verificando
          </>
        ) : (
          <>
            <LogIn size={17} aria-hidden="true" /> Entrar
          </>
        )}
      </button>
    </form>
  );
}
