import Sidebar from 'components/Sidebar';
import Navbar from 'components/Navbar';
import HomeView from './Home';

function Home(): JSX.Element {
  return (
    <>
      <Sidebar />
      <Navbar />
      <HomeView />
    </>
  );
}

export default Home;
