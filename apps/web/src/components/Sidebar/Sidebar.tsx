import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import ROUTER_PATH from '@/constants/RouterPath';
import { Icon } from 'ui';
import IconNames from 'ui/components/atoms/Icon/Icons.types';

function Sidebar(): JSX.Element {
  const { t } = useTranslation();
  return (
    <nav className="sidebar color:var(--color-sidebar-bg)] fixed inset-y-0 left-0 z-[100] min-w-[280px] border-r border-[hsla(0,0%,100%,0.1)] px-0 pb-0 pt-12 shadow-[inset_-1px_0_0_rgba(0,0,0,0.1)]">
      <div className="sticky">
        <h3 className="mb-5 text-center text-3xl font-bold tracking-[1px] text-[white] dark:text-white">
          Ici Logo
        </h3>
        <ul className="nav flex flex-col justify-center pt-4">
          <li className="mb-4 flex items-center">
            <Icon
              as={IconNames.HOME}
              className="_:stroke-white _:stroke-1.5 _:h-5 _:w-5 _:min-h-5"
            />
            <a
              aria-current="page"
              className="ml-2 font-medium text-[\_em(16px)] text-[color:var(--color-text)]"
              href={ROUTER_PATH.HOME}>
              {t('navbar.home')}
            </a>
          </li>
          <li className="mb-4 flex stroke-white">
            <Icon
              as={IconNames.PROFIL}
              className="_:stroke-white _:stroke-1.5 _:h-5 _:w-5 _:min-h-5"
            />
            <a
              aria-current="page"
              className="ml-2 font-medium text-[\_em(16px)] text-[color:var(--color-text)]"
              href={ROUTER_PATH.PROFIL}>
              {t('navbar.profil')}
            </a>
          </li>
          <li className="mb-4 flex stroke-white">
            <Icon
              as={IconNames.PROFILS}
              className="_:stroke-white _:stroke-1.5 _:h-5 _:w-5 _:min-h-5"
            />
            <a
              aria-current="page"
              className="ml-2 font-medium text-[\_em(16px)] text-[color:var(--color-text)]"
              href={ROUTER_PATH.USERS}>
              {t('navbar.users')}
            </a>
          </li>
          <li className="mb-4 flex stroke-white">
            <Icon
              as={IconNames.PROFILS}
              className="_:stroke-white _:stroke-1.5 _:h-5 _:w-5 _:min-h-5"
            />
            <a
              aria-current="page"
              className="ml-2 font-medium text-[\_em(16px)] text-[color:var(--color-text)]"
              href={ROUTER_PATH.CONCERTS}>
              {t('navbar.concerts')}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
