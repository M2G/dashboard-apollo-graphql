import Navbar from 'components/Navbar/Navbar';
import HomeView from './Home';
import FilterContext from '../../FiltersContext';

function Home() {
  return <FilterContext.Provider>
    <Navbar />
    <HomeView />
  </FilterContext.Provider>;
}

export default Home;
