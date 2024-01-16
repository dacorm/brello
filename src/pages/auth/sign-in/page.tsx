import { FC } from "react";

import { LayoutAuthn } from "@/layouts/authn";

import { IconArrowLeft, IconMail01 } from "@/shared/assets/icons";
import { Button, FeaturedIcon, Input } from "@/shared/ui";

import styles from "./styles.module.css";
import {
  $email,
  $error,
  $finished,
  $pending,
  backToLoginClicked,
  emailChanged,
  formSubmitted,
  SignInError,
} from "./model.ts";
import { useUnit } from "effector-react";

export const PageLoader = () => {
  return <LayoutAuthn>Session loading…</LayoutAuthn>;
};

export const SignInPage = () => {
  const finished = useUnit($finished);

  return (
    <LayoutAuthn>{finished ? <LoginSucceeded /> : <LoginForm />}</LayoutAuthn>
  );
};

const errorText: { [Key in SignInError]: string } = {
  UnknownError: "Something wrong happened. Please try again.",
  InvalidEmail: "Must be a valid email address.",
  RateLimit: "Too much logins. Try again later.",
};

const LoginForm: FC = () => {
  const [email, pending, error] = useUnit([$email, $pending, $error]);
  const [handleEmail, handleSubmit] = useUnit([emailChanged, formSubmitted]);

  return (
    <>
      <h1 className={styles.headline}>Sign in</h1>
      <p className={styles.description}>Start your 30-day free trial.</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Input
          className={styles.input}
          name="email"
          disabled={pending}
          value={email}
          error={error ? errorText[error] : undefined}
          label="Email"
          placeholder="Enter your email"
          onValue={handleEmail}
        />
        <Button
          loading={pending}
          onClick={handleSubmit}
          className={styles.button}
          type="submit"
        >
          Get started
        </Button>
      </form>
    </>
  );
};

const LoginSucceeded: FC = () => {
  const [email, handleBackPressed] = useUnit([$email, backToLoginClicked]);

  return (
    <>
      <FeaturedIcon
        className={styles.featuredIcon}
        color="primary"
        Icon={IconMail01}
      />
      <h1 className={styles.headline}>Check your email</h1>
      <p className={styles.description}>
        We sent a login link to{" "}
        <span className={styles.descriptionAccent}>{email}</span>
      </p>
      <Button
        variant="link-gray"
        className={styles.buttonBack}
        onClick={handleBackPressed}
      >
        <IconArrowLeft className={styles.backIcon} />
        Back to login
      </Button>
    </>
  );
};
