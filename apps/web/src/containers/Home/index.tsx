import type { JSX } from 'react';

import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';

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
