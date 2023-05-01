import Navbar from 'components/Navbar';

function Home(): JSX.Element {
  return (
    <div className="o-grid">
      <div className="o-grid__row">
        <div className="o-col">
          <Navbar />
          <div>ok</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
