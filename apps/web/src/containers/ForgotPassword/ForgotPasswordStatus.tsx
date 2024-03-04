import { useTranslation } from 'react-i18next';

interface IForgotPasswordStatus {
  success?: boolean;
}

function ForgotPasswordStatus({
  success = false,
}: IForgotPasswordStatus): JSX.Element {
  const { t } = useTranslation();
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center"
      id="form-forgot-password">
      <div>
        {success
          ? t(
              'forgotPassword.forgotPasswordConfirmation',
              'Your request has been processed successfully',
            )
          : t(
              'forgotPassword.forgotPasswordError',
              'An error has occurred during your request',
            )}
      </div>
    </div>
  );
}

export default ForgotPasswordStatus;
