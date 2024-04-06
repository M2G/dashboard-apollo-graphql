import { useTranslation } from 'react-i18next';

function NoData(): JSX.Element {
  const { t } = useTranslation();
  return <div>{t('noData', 'No Data')}</div>;
}

export default NoData;
