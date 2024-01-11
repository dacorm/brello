import { createEvent, createStore } from "effector";

export type SignInError = "UnknownError" | "InvalidEmail" | "RateLimit";

const emailChanged = createEvent<string>();
const $email = createStore("");

$email.on(emailChanged, (_, email) => email);
