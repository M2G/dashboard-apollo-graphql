import { useTranslation } from 'react-i18next';

interface IResetPasswordStatus {
  success?: boolean;
}

function ResetPasswordStatus({
  success = false,
}: IResetPasswordStatus): JSX.Element {
  const { t } = useTranslation();

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center"
      id="form-forgot-password">
      <div>
        {success
          ? t(
              'resetPassword.passwordResetConfirmation',
              'Your password has been reset successfully',
            )
          : t(
              'resetPassword.passwordResetError',
              'An error occured while resetting your password',
            )}
      </div>
    </div>
  );
}

export default ResetPasswordStatus;
