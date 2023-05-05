import Navbar from 'components/Navbar/Navbar';
import Sidebar from 'components/Sidebar';
import Users from './Users';

function UsersPage(): JSX.Element {
  return (
    <>
      <Sidebar />
      <Navbar />
      <Users />
    </>
  );
}

export default UsersPage;
