import { attach, createEvent, createStore, sample } from "effector";
import { api } from "@/shared/api";
import { not } from "patronum";

export type SignInError = "UnknownError" | "InvalidEmail" | "RateLimit";

const signInFx = attach({ effect: api.auth.signInWithEmailFx });

export const emailChanged = createEvent<string>();
export const formSubmitted = createEvent();
export const backToLoginClicked = createEvent();

export const $email = createStore("");
export const $error = createStore<SignInError | null>(null);
export const $pending = createStore(false);
export const $finished = createStore(false);

const $isEmailValid = $email.map(
  (email) => email.includes("@") && email.includes(".") && email.length > 5
);

$email.on(emailChanged, (_, email) => email);

sample({
  clock: formSubmitted,
  source: { email: $email },
  filter: $isEmailValid,
  target: [signInFx, $error.reinit],
});

$finished.on(signInFx, () => true);

sample({
  clock: backToLoginClicked,
  target: [$email.reinit, $error.reinit, $finished.reinit],
});

sample({
  clock: formSubmitted,
  filter: not($isEmailValid),
  fn: (): SignInError => "InvalidEmail",
  target: $error,
});

$error.on(signInFx.failData, (_, error) => {
  if (error.status === 429) {
    return "RateLimit";
  }

  return "UnknownError";
});
