enum Status {
  SUCCESS = 'success',
  ERROR = 'error',
}

interface IResetPasswordStatus {
  status: Status;
}

function ResetPasswordStatus(status: IResetPasswordStatus): JSX.Element {
  return status === Status.SUCCESS && <div>Password reset confirmation</div>;
}

export default ResetPasswordStatus;
