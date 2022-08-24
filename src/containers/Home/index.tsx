/*eslint-disable*/
import Navbar from 'components/Navbar/Navbar';
import HomeView from './Home';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';

function Home() {
  const { activateAuth }: any = useContext(AuthContext);
  return <>
    <Navbar />
    <HomeView activateAuth={activateAuth} />
  </>
}

export default Home;
