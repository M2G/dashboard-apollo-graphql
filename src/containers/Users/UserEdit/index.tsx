/*eslint-disable*/
import UserEditView from 'containers/Users/UserEdit/UserEdit';
import { INITIAL_VALUES, INPUT_NAME } from './constants';

function UserEdit({ data, onSubmit }: any) {
  function initialValues(values: any) {
    const initialValues = { ...INITIAL_VALUES };

    if (values) {
      initialValues[INPUT_NAME.ID] = values?.[INPUT_NAME.ID];
      initialValues[INPUT_NAME.USERNAME] = values?.[INPUT_NAME.USERNAME];
      initialValues[INPUT_NAME.FIRST_NAME] = values?.[INPUT_NAME.FIRST_NAME];
      initialValues[INPUT_NAME.LAST_NAME] = values?.[INPUT_NAME.LAST_NAME];
      initialValues[INPUT_NAME.EMAIL] = values?.[INPUT_NAME.EMAIL];
      initialValues[INPUT_NAME.CREATED_AT] = values?.[INPUT_NAME.CREATED_AT];
    }

    return initialValues;
  }

  return <UserEditView
      initialValues={initialValues(data)}
      onSubmit={onSubmit}
    />
}

export default UserEdit;
