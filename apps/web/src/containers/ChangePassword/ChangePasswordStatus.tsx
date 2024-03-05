import { useTranslation } from 'react-i18next';

interface IForgotPasswordStatus {
  success?: boolean;
}

function ChangePasswordStatus({
  success = false,
}: IForgotPasswordStatus): JSX.Element {
  const { t } = useTranslation();
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center"
      id="form-change-password">
      <div className="rounded-2xl bg-white p-[25px]">
        {success
          ? t(
              'changePassword.changePasswordConfirmation',
              'Your request has been processed successfully',
            )
          : t(
              'changePassword.changePasswordError',
              'An error has occurred during your request',
            )}
      </div>
    </div>
  );
}

export default ChangePasswordStatus;
