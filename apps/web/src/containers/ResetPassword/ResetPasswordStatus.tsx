import { useTranslation } from 'react-i18next';
enum Status {
  SUCCESS = 'success',
  ERROR = 'error',
}

interface IResetPasswordStatus {
  status: Status;
}

function ResetPasswordStatus(status: IResetPasswordStatus): JSX.Element {
  const { t } = useTranslation();
  return status === Status.SUCCESS ? (
    <div>{t('resetPassword.passwordResetConfirmation')}</div>
  ) : (
    <div>{t('resetPassword.passwordResetError')}</div>
  );
}

export default ResetPasswordStatus;
