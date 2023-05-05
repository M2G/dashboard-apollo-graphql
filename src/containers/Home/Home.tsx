import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';

function Home(): JSX.Element {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="o-grid">
        <div className="o-grid__row">
          <div className="o-col">
            <div>ok</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
