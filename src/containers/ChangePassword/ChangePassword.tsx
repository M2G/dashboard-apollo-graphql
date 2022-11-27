import { useCallback, useContext } from 'react';
import ChangePasswordForm from 'components/ChangePassordForm';
import { INITIAL_VALUES } from 'components/ChangePassordForm/constants';
import { AuthContext } from 'AuthContext';
import { useUpdateUserMutation } from 'modules/graphql/generated';

function ChangePassword(): JSX.Element {
  const {
    // eslint-disable-next-line
    userData: { _id }
  } = useContext(AuthContext);
  const [changePassword] = useUpdateUserMutation();
  const handleSubmit = useCallback(
    async (formData: any) => {
      await changePassword({
        variables: {
          id: _id,
          ...formData,
        },
      });
    },
    [changePassword, _id],
  );

  return (
    <ChangePasswordForm
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
    />
  );
}

export default ChangePassword;
