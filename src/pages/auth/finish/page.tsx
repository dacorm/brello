import { useUnit } from "effector-react";
import { FC } from "react";

import { LayoutAuthn } from "@/layouts/authn";

import {
  IconAlertCircle,
  IconArrowLeft,
  IconMail01,
} from "@/shared/assets/icons";
import { Button, FeaturedIcon, Loading } from "@/shared/ui";

import { $pending, $successfully, tryAgainClicked } from "./model";
import styles from "./styles.module.css";

export const AuthFinishPage = () => {
  const [pending, successfully] = useUnit([$pending, $successfully]);

  return (
    <LayoutAuthn>
      {/** Question: How it can be rewritten? */}
      {pending ? (
        <LoginValidating />
      ) : successfully ? (
        <LoginFinished />
      ) : (
        <LoginFailed />
      )}
    </LayoutAuthn>
  );
};

const LoginValidating: FC = () => {
  return (
    <>
      <Loading className={styles.loader} />
      <h1 className={styles.headline}>Signing You In</h1>
      <p className={styles.description}>
        Validating your credentials. This may take a few seconds…
      </p>
    </>
  );
};

const LoginFinished: FC = () => {
  return (
    <>
      <FeaturedIcon
        className={styles.featuredIcon}
        color="primary"
        Icon={IconMail01}
      />
      <h1 className={styles.headline}>Sign In Successful</h1>
      <p className={styles.description}>
        Your credentials have been verified. Welcome back!
      </p>
      <p className={styles.description}>You'll be redirected shortly…</p>
    </>
  );
};

const LoginFailed: FC = () => {
  const handleTryAgain = useUnit(tryAgainClicked);

  return (
    <>
      <FeaturedIcon
        className={styles.featuredIcon}
        color="error"
        Icon={IconAlertCircle}
      />
      <h1 className={styles.headline}>Sign In Failed</h1>
      <p className={styles.description}>
        We encountered an issue validating your sign-in link. Please ensure the
        link hasn't expired or been used before.
      </p>
      <Button
        variant="link-gray"
        className={styles.buttonBack}
        onClick={handleTryAgain}
      >
        <IconArrowLeft className={styles.backIcon} />
        Try again
      </Button>
    </>
  );
};
