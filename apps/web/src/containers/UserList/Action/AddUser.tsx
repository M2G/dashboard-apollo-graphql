import { useTranslation } from 'react-i18next';

interface IAddUser {
  onAdd: () => void;
}

function AddUser({ onAdd }: IAddUser) {
  const { t } = useTranslation();
  return (
    <div className="c-btn-user">
      <button className="btn btn-light" onClick={onAdd} type="submit">
        {t('Add user')}
      </button>
    </div>
  );
}

export default AddUser;
