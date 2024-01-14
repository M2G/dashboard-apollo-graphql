import Navbar from 'components/Navbar/Navbar';
import Sidebar from 'components/Sidebar';
import Users from './Users';
import './index.scss';

function UsersPage(): JSX.Element {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Users />
    </>
  );
}

export default UsersPage;
