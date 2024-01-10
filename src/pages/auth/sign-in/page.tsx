import { FC } from "react";

import { LayoutAuthn } from "@/layouts/authn";

import { IconArrowLeft, IconMail01 } from "@/shared/assets/icons";
import { Button, FeaturedIcon, Input } from "@/shared/ui";

import styles from "./styles.module.css";
import { SignInError } from "@/pages/auth/sign-in/model.ts";

export const PageLoader = () => {
  return <LayoutAuthn>Session loading…</LayoutAuthn>;
};

export const SignInPage = () => {
  return (
    <LayoutAuthn>{false ? <LoginSucceeded /> : <LoginForm />}</LayoutAuthn>
  );
};

const errorText: { [Key in SignInError]: string } = {
  UnknownError: "Something wrong happened. Please try again.",
  InvalidEmail: "Must be a valid email address.",
  RateLimit: "Too much logins. Try again later.",
};

const LoginForm: FC = () => {
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
          disabled={false}
          value={""}
          error={false ? errorText["UnknownError"] : undefined}
          label="Email"
          placeholder="Enter your email"
          onValue={() => 1}
        />
        <Button loading={false} className={styles.button} type="submit">
          Get started
        </Button>
      </form>
    </>
  );
};

const LoginSucceeded: FC = () => {
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
        <span className={styles.descriptionAccent}>{""}</span>
      </p>
      <Button
        variant="link-gray"
        className={styles.buttonBack}
        onClick={() => console.log(1123)}
      >
        <IconArrowLeft className={styles.backIcon} />
        Back to login
      </Button>
    </>
  );
};
