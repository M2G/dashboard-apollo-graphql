import UserList from 'containers/UserList/UserList';

function Home() {
  return (
    <div className="o-zone">
      <div className="o-grid">
        <header className="o-zone__head">
          <h2 className="o-zone__head__title">test</h2>
        </header>
        <div className="o-grid__row">
          <div className="o-col">
            <div className="o-cell--one">
              <UserList canEdit canDelete canAdd id="test" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
