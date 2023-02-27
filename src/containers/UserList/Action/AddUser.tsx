import { useTranslation } from 'react-i18next';

interface IAddUser {
  canAdd: boolean;
  onAdd: () => void;
}

function AddUser({ canAdd, onAdd }: IAddUser) {
  const { t } = useTranslation();
  return (
    <div>
      {canAdd && (
        <button className="btn btn-primary my-2" type="submit" onClick={onAdd}>
          {t('Add user')}
        </button>
      )}
    </div>
  );
}

export default AddUser;