import UserNewView from 'containers/Users/UserNew/UserNew';
import type { User } from 'modules/graphql/generated';
import { INITIAL_VALUES } from './constants';

interface IUserNew {
  readonly onSubmit: (user: User) => void;
}

function UserNew({ onSubmit }: IUserNew): JSX.Element {
  function initialValues() {
    return { ...INITIAL_VALUES };
  }

  return <UserNewView initialValues={initialValues()} onSubmit={onSubmit} />;
}

export default UserNew;
